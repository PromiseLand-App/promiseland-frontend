import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import { useDisconnect } from 'wagmi';

export default function Navmenu() {
  const { disconnect } = useDisconnect();

  return (
    <Menu as="div" className="relative z-10 hidden text-left sm:inline-block">
      <div>
        <Menu.Button className="inline-flex cursor-pointer items-center rounded-full px-2.5 py-2 text-sm font-medium text-gray-800 hover:text-gray-300 ">
          <p className="overflow-hidden text-ellipsis">Setting</p>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {(address) => (
                <a
                  href={`/profile`}
                  className={clsx(
                    address ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm',
                  )}
                >
                  My Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {(address) => (
                <a
                  href={`/setting`}
                  className={clsx(
                    address ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm',
                  )}
                >
                  Setting
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {(address) => (
                <a
                  onClick={() => disconnect()}
                  className={clsx(
                    address ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block cursor-pointer px-4 py-2 text-sm',
                  )}
                >
                  Log Out
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
