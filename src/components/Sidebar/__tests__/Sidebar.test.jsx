import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

describe('Sidebar', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('renders navigation items', () => {
    render(<Sidebar />);
    expect(screen.getAllByText(/Home/i)[0]).toBeTruthy();
    expect(screen.getAllByText(/Search/i)[0]).toBeTruthy();
  });

  it('navigates to home on click', () => {
    render(<Sidebar />);
    fireEvent.click(screen.getAllByText(/Home/i)[0]);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
