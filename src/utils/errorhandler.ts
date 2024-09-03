export function toast(message: string) {
  const toast = document.createElement('div');
  toast.classList.add('ns_toast');
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
