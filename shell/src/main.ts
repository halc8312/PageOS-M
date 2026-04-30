import './ui/theme.css';
import './ui/crt.css';
import './ui/components/components.css';
import { bootPageOS } from './boot/bootloader';

const root = document.querySelector<HTMLDivElement>('#app');

if (!(root instanceof HTMLDivElement)) {
  throw new Error('Missing #app root element.');
}

void bootPageOS(root);
