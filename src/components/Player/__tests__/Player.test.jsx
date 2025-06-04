import { render, screen, fireEvent } from '@testing-library/react';
import Player from '../Player';
import { PlayerContext } from '../../../context/PlayerContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const baseContext = {
  track: { image: 'img', desc: 'desc', name: 'Song', file: 'file.mp3', id: 0 },
  playStatus: false,
  play: vi.fn(),
  pause: vi.fn(),
  previous: vi.fn(),
  next: vi.fn(),
  seekBar: { current: document.createElement('hr') },
  seekBg: { current: document.createElement('div') },
  seekSong: vi.fn(),
  time: {
    currentTime: { minute: 0, second: 0 },
    totalTime: { minute: 3, second: 0 },
  },
  isShuffling: false,
  isLooping: false,
  toggleShuffle: vi.fn(),
  toggleLoop: vi.fn(),
};

const renderPlayer = (ctx = baseContext) =>
  render(
    <PlayerContext.Provider value={ctx}>
      <Player />
    </PlayerContext.Provider>
  );

describe('Player', () => {
  beforeEach(() => {
    Object.values(baseContext).forEach(v => typeof v === 'function' && v.mockClear());
  });

  it('shows play button when paused', () => {
    const { container } = renderPlayer();
    const btn = container.querySelectorAll('img')[3];
    expect(btn.src).toContain('play');
  });

  it('calls play when play button clicked', () => {
    const { container } = renderPlayer();
    const btn = container.querySelectorAll('img')[3];
    fireEvent.click(btn);
    expect(baseContext.play).toHaveBeenCalled();
  });

  it('shows pause button when playing', () => {
    const { container } = renderPlayer({ ...baseContext, playStatus: true });
    const btn = container.querySelectorAll('img')[3];
    expect(btn.src).toContain('pause');
  });
});
