import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Cources", link: "#", user: true },
  { name: "Study Resources", link: "#", user: true },
  { name: "Course Edit", link: "#", admin: true },
  { name: "Resources Edit", link: "#", admin: true },
];

const userNavigation = [
  { name: "My Profile", link: "/proflie" },
  { name: "My Courses", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <div className="flex">
                        {/* ----------------------------- Ecom Logo Photo--------------------------- */}
                        <div>
                          <img
                            className="h-8 w-8"
                            src="data:image/jpeg;base64,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"
                            alt="Your Company"
                          />
                        </div>
                        <div>
                          <b className="ml-5 lg:text-lg md:text-md  text-white">
                            Gurukul
                          </b>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.link}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default NavBar;
