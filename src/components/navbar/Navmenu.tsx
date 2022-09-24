import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';

export default function Navmenu() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ens } = useEnsName({
    address: address,
  });

  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-32 cursor-pointer items-center rounded-full bg-indigo-100 px-2.5 py-2 text-sm font-medium text-indigo-800">
          <span className="mr-1 h-3 w-12 rounded-full bg-indigo-400"> </span>
          <p className="overflow-hidden text-ellipsis">{ens ?? address}</p>
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
                  href={`/my-posts`}
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
