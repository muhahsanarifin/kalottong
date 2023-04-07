import React from "react";
import { Button, Modal, Label, Checkbox } from "flowbite-react";
import { AuthModalProps } from "@/utils/types/modalType";

export const AuthModal = ({ onShow, onSetClose }: AuthModalProps) => {
  return (
    <>
      <Modal
        show={onShow}
        size="md"
        popup={true}
        dismissible={true}
        onClose={onSetClose}
        className="min-h-screen"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900">
              Sign in to <span className="text-red-orange">kalottong</span>
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <input
                name="email"
                id="email"
                type="email"
                required={true}
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-orange focus:border-red-orange block w-full p-2.5"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <input
                name="password"
                id="password"
                type="password"
                required={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-orange focus:border-red-orange block w-full p-2.5"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  className="text-red-orange focus:ring-red-orange"
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="/modal"
                className="text-sm text-red-orange hover:underline"
              >
                Forget Password?
              </a>
            </div>
            <div className="w-full">
              <Button
                className="bg-red-orange hover:bg-red-orange-dark focus:ring-4 focus:ring-red-orange-light"
                onClick={() => console.log("Test")}
              >
                Log in to your account
              </Button>
            </div>
            <div className="text-sm font-medium text-gray-500">
              Not registered?
              <a href="/modal" className="text-red-orange hover:underline">
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
