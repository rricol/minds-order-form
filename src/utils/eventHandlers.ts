import {
  handeAddToCart,
  handleClearCart,
  handleInputChange,
  handleNextStep,
  handlePreviousStep,
  handleQuantityChange,
  handleRemoveFromCart,
} from './handleFunctions';

export function attachAddButtonEvents(): void {
  document.querySelectorAll('[ns-mindsorder-btn="add"]').forEach((button) => {
    button.addEventListener('click', handeAddToCart);
  });
}

export function attachRemoveButtonEvents(): void {
  document.querySelectorAll('[ns-mindsorder-btn="remove"]').forEach((button) => {
    button.addEventListener('click', handleRemoveFromCart);
  });
}

export function attachClearButtonEvents(): void {
  document.querySelectorAll('[ns-mindsorder-btn="clear"]').forEach((button) => {
    button.addEventListener('click', handleClearCart);
  });
}

export function attachStepsButtonEvents(): void {
  document.querySelectorAll('[ns-mindsorder-btn="next"]').forEach((button) => {
    button.addEventListener('click', handleNextStep);
  });

  document.querySelectorAll('[ns-mindsorder-btn="prev"]').forEach((button) => {
    button.addEventListener('click', handlePreviousStep);
  });
}

export function attachQuantityChangeEvents(): void {
  document.querySelectorAll('[ns-mindsorder-input]').forEach((input) => {
    input.addEventListener('change', handleInputChange);
  });
}

export function attachQuantityActionsEvents(): void {
  document.querySelectorAll('[ns-mindsorder-btn="increase"]').forEach((button) => {
    button.addEventListener('click', handleQuantityChange);
  });
  document.querySelectorAll('[ns-mindsorder-btn="decrease"]').forEach((button) => {
    button.addEventListener('click', handleQuantityChange);
  });
}
