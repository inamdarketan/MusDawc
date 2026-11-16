// No HTML injection sinks are used in this app; this named policy intentionally
// has no conversion callbacks and cannot bless untrusted strings.
export function registerTrustedTypesPolicy(): void {
  const factory = (window as Window & { trustedTypes?: { createPolicy: (name: string, options: Record<string, never>) => unknown } }).trustedTypes;
  factory?.createPolicy('musdawc', {});
}
