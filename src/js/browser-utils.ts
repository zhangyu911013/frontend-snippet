export function insertParam(url, {
  key, value,
}) {
  const enKey = encodeURIComponent(key);
  const enValue = encodeURIComponent(value);

  const search = url.split('?')[1] || '';
  const kvp = search.split('&');
  let i = 0;

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(`${enKey}=`)) {
      const pair = kvp[i].split('=');
      pair[1] = enValue;
      kvp[i] = pair.join('=');
      break;
    }
  }

  if (i >= kvp.length) {
    kvp[kvp.length] = [enKey, enValue].join('=');
  }

  const params = kvp.join('&');
  const result = `${url.split('?')[0]}?${params}`;
  return result;
}

export function parseQueries(url = window.location.href) {
  const query = {} as any;
  const pairs = (url.split('?')[1] || '').split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}