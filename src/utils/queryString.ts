export function parse(qs: string) {
  return qs
    .replace(/^\?/, '')
    .split('&')
    .reduce((o, item) => {
      const [key, value] = item.split('=');
      // eslint-disable-next-line no-param-reassign
      o[key] = decodeURIComponent(value || '');
      return o;
    }, {} as { [key: string]: string });
}
