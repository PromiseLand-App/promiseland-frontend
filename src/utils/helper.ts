export function trimAddress(address?: string, head = 6, tail = 0): string {
  if (!address) {
    return '';
  }

  return (
    address.substring(0, head) + '...' + (tail ? address.slice(-tail) : '')
  );
}
