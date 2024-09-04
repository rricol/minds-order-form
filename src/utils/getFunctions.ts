import type { Resource } from './types';

export function getResourcePricing(resource: Resource) {
  const { type, title, quantity = 0 } = resource;
  if (type === 'Infographie') {
    return quantity * 3;
  }
  if (type === 'Brochure') {
    if (title === 'Qui est minds ?') return quantity * 0;
    return quantity * 8;
  }
  if (type === 'Publication') {
    return quantity * 22;
  }
  if (type === 'Jeux') {
    return quantity * 20;
  }
  return 0;
}

export function getRawPrice(): number {
  const resources: Resource[] = JSON.parse(localStorage.getItem('orderList') || '[]');
  let total = 0;

  resources.forEach((resource) => {
    total += getResourcePricing(resource);
  });

  return total;
}

export function getShipping(): number {
  const resources: Resource[] = JSON.parse(localStorage.getItem('orderList') || '[]');
  let shipping = 0;
  let totalQuantity = 0;
  const totalBrochure = resources.reduce((acc, resource) => {
    return resource.type === 'Brochure' ? acc + (resource.quantity ?? 0) : acc;
  }, 0);
  const totalInfographie = resources.reduce((acc, resource) => {
    return resource.type === 'Infographie' ? acc + (resource.quantity ?? 0) : acc;
  }, 0);
  const totalPublication = resources.reduce((acc, resource) => {
    return resource.type === 'Publication' ? acc + (resource.quantity ?? 0) : acc;
  }, 0);
  const totalJeux = resources.reduce((acc, resource) => {
    return resource.type === 'Jeux' ? acc + (resource.quantity ?? 0) : acc;
  }, 0);
  totalQuantity = totalBrochure + totalInfographie + totalPublication + totalJeux;
  if (totalBrochure < 4 && totalBrochure === totalQuantity) {
    shipping = 0;
  } else if (totalJeux < 4 && totalJeux === totalQuantity) {
    shipping = 0;
  } else if (totalBrochure < 4 && totalJeux < 4 && totalQuantity === totalBrochure + totalJeux) {
    shipping = 0;
  } else if (totalQuantity > 1 && totalQuantity < 10) {
    shipping = 9;
  } else if (totalQuantity === 1) {
    shipping = 0;
  } else {
    shipping = 9;
  }

  return shipping;
}
