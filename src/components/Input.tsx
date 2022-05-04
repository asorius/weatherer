import React, { KeyboardEvent, SyntheticEvent } from 'react';
import { Ctx } from '../context';
type InputProps = {
  updateFunction: (a: HTMLInputElement) => void;
  onPressedKey: (a: KeyboardEvent<HTMLInputElement>) => void;
  arrow?: boolean;
  isFocused?: boolean;
  value: string;
};
export default function Input({
  updateFunction,
  onPressedKey,
  value,
  arrow = false,
  isFocused = false,
}: InputProps) {
  const input = React.createRef<HTMLInputElement>();
  const context = React.useContext(Ctx);
  return (
    <div className='relative z-1 my-4 border-b-2 border-slate-400 focus-within:border-mainBlue'>
      <svg
        width='130'
        height='130'
        viewBox='0 0 130 130'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute bottom-full right-[85%] rotate-45'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M60.9866 102.011C75.5791 112.188 92.2457 119.614 108.76 118.142C114.825 117.601 120.44 115.34 126.202 113.089C126.708 112.891 126.959 112.318 126.761 111.813C126.564 111.307 125.991 111.055 125.486 111.253C119.899 113.436 114.463 115.655 108.587 116.178C92.3221 117.629 75.9409 110.146 61.6177 100.05C61.6659 99.904 61.7161 99.7581 61.7664 99.6122C62.8717 96.4058 62.1703 91.7303 60.3636 86.8178C57.7429 79.686 52.8573 72.0229 48.4641 67.7902C46.4383 65.8366 44.4768 64.6098 42.8751 64.3519C41.5406 64.1357 40.3951 64.5004 39.5108 65.5345C38.7833 66.3888 38.3673 67.4776 38.2447 68.7539C38.0819 70.4574 38.4477 72.5256 39.2174 74.7761C42.0652 83.1034 50.4316 94.0615 54.9675 97.5779C56.3884 98.6797 57.8334 99.7607 59.3045 100.818C59.0111 101.74 58.7277 102.621 58.38 103.433C57.8696 104.626 57.2244 105.663 56.1352 106.411C54.1255 107.791 51.7158 108.026 49.2519 107.666C45.3068 107.093 41.2271 105.009 38.2186 103.222C21.2968 93.1733 12.9424 75.7346 8.44871 58.2386C3.90274 40.5446 3.30786 22.7699 1.96336 12.2859C1.89302 11.7467 1.39863 11.3638 0.860028 11.4341C0.321425 11.5018 -0.0604183 11.9968 0.00791197 12.5359C1.36045 23.0773 1.9714 40.9432 6.53948 58.7283C11.1598 76.7114 19.8197 94.5877 37.2137 104.918C40.4152 106.817 44.7703 109.005 48.9685 109.617C51.9369 110.047 54.8289 109.698 57.2486 108.036C58.6594 107.067 59.5316 105.749 60.1908 104.21C60.4862 103.519 60.7394 102.78 60.9866 102.011ZM59.9436 98.8516C60.8761 95.976 60.1144 91.8475 58.5147 87.4976C55.9965 80.6445 51.3179 73.2757 47.0975 69.2071C45.6827 67.8449 44.3382 66.8577 43.1504 66.4487C42.2923 66.1518 41.5426 66.1883 41.0101 66.8134C40.3971 67.5323 40.166 68.5143 40.176 69.6604C40.1861 70.981 40.5217 72.5048 41.0824 74.1405C43.8136 82.1266 51.8243 92.6498 56.1734 96.0203C57.4113 96.9788 58.6694 97.9244 59.9436 98.8516Z'
          fill='black'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M127.814 110.052C127.747 110.502 127.522 111.075 127.263 111.677C126.678 113.039 125.846 114.493 125.476 115.196C125.225 115.678 125.41 116.274 125.892 116.527C126.375 116.78 126.97 116.592 127.223 116.11C127.673 115.251 128.774 113.323 129.365 111.727C129.669 110.906 129.832 110.151 129.799 109.606C129.765 109.072 129.548 108.713 129.239 108.458C128.913 108.189 128.409 108.03 127.735 108.051C126.996 108.075 125.941 108.309 124.781 108.395C123.808 108.468 122.745 108.437 121.779 107.952C121.292 107.707 120.699 107.903 120.456 108.39C120.213 108.874 120.408 109.468 120.894 109.71C122.707 110.622 124.765 110.424 126.391 110.19C126.875 110.119 127.476 110.073 127.814 110.052Z'
          fill='black'
        />
      </svg>
      <input
        className='block w-full appearance-none bg-transparent p-1 focus:outline-none'
        type='text'
        ref={input}
        name='place'
        value={value}
        autoComplete='off'
        placeholder=' '
        onChange={(e: SyntheticEvent<HTMLInputElement>) => {
          updateFunction(e.currentTarget);
        }}
        onKeyDown={(key: KeyboardEvent<HTMLInputElement>) =>
          key.code === 'ArrowDown' &&
          context?.dispatch({ type: 'input-focus-change' })
        }
      />
      <label
        htmlFor='place'
        className='absolute top-0 -z-1 duration-300 origin-0 cursor-text font-medium text-black/40'
        onClick={() => input.current?.focus()}>
        Enter a location
      </label>
    </div>
  );
}
