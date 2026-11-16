import { describe, expect, it } from 'vitest';
import { sniffAudio } from './audioFile';

describe('audio signature checks', () => {
  it('accepts recognized container signatures', () => {
    expect(sniffAudio(new TextEncoder().encode('RIFF1234WAVE'))).toBe(true);
    expect(sniffAudio(new TextEncoder().encode('ID3'))).toBe(true);
    expect(sniffAudio(new TextEncoder().encode('OggS'))).toBe(true);
    expect(sniffAudio(new TextEncoder().encode('fLaC'))).toBe(true);
    expect(sniffAudio(Uint8Array.from([0x1a,0x45,0xdf,0xa3]))).toBe(true);
  });
  it('rejects extension-like text and truncated WAV signatures', () => {
    expect(sniffAudio(new TextEncoder().encode('music.wav'))).toBe(false);
    expect(sniffAudio(new TextEncoder().encode('RIFF1234'))).toBe(false);
  });
});
