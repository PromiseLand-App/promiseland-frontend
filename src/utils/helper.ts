export function trimAddress(address?: string, length = 6): string {
  if (!address) {
    return '';
  }

  return address.substring(0, length) + '...';
}
