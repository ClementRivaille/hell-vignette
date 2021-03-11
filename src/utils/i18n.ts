import { computed, getCurrentInstance } from '@vue/runtime-core';

export function useLocale() {
  const instance = getCurrentInstance();
  if (!instance || !instance.root.proxy) {
    return 'en';
  }
  return computed(() => instance!.root.proxy!.$i18n.locale);
}

export function useUpdateLocale() {
  const instance = getCurrentInstance();
  if (instance && instance.root.proxy) {
    return (locale: string) => {
      instance.root.proxy!.$i18n.locale = locale;
    };
  }
  return () => undefined;
}
