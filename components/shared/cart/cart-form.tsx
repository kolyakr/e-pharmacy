"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { INITIAL_ACTION_STATE } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { placeOrder } from "@/lib/actions/order.actions";
import { calcCartPrice, cn } from "@/lib/utils";
import { Cart, Product } from "@/types";
import React, { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

const FormSectionHeader = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h3 className="font-[600] text-[16px] leading-[22px] md:text-[20px] md:leading-[28px]">
        {title}
      </h3>
      <p className="text-[#6A6A6F] font-[400] text-[14px] leading-[18px] md:text-[16px] md:leading-[20px]">
        {description}
      </p>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="py-[13px] px-[32px] bg-greenColor text-whiteColor font-[500] text-[14px] leading-[18px] max-w-[141px] rounded-[60px]"
    >
      {pending ? "Processing..." : "Place order"}
    </Button>
  );
};

const CartForm = ({
  cart,
  products,
}: {
  cart: Cart;
  products: (Product | null)[];
}) => {
  const [state, action] = useActionState(placeOrder, INITIAL_ACTION_STATE);

  useEffect(() => {
    if (state.success === true) {
      toast({
        title: state.message,
        variant: "default",
      });
    } else if (state.success === false && state.message !== "") {
      toast({
        title: "Failed to place order",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state]);

  const total = calcCartPrice(cart, products);

  return (
    <form
      action={action}
      className="p-5 md:py-10 md:px-[78px] border rounded-[27px] flex flex-col md:max-w-[704px] xl:max-w-[628px] xl:max-h-[913px]"
    >
      <div className="border-b pb-10">
        <FormSectionHeader
          className="mb-10"
          title="Enter shipping info"
          description="Enter your delivery address where you get the product. You can also
            send any other location where you send the products."
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[14px]">
          <div className="flex flex-col gap-2">
            <label
              className="font-[600] text-[14px] leading-[18px]  ml-[18px]"
              htmlFor="name"
            >
              Name
            </label>
            <input
              required
              className="max-w-[295px] md:max-w-[260px] py-[13px] px-[18px] border rounded-[60px] font-[400] text-[12px] leading-[18px] text-[#1D1E2199]"
              type="text"
              id="name"
              name="name"
              placeholder="Enter text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-[600] text-[14px] leading-[18px]  ml-[18px]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              className="max-w-[295px] md:max-w-[260px] py-[13px] px-[18px] border rounded-[60px] font-[400] text-[12px] leading-[18px] text-[#1D1E2199]"
              type="text"
              id="email"
              name="email"
              placeholder="Enter text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-[600] text-[14px] leading-[18px] ml-[18px] "
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              required
              className="max-w-[295px] md:max-w-[260px] py-[13px] px-[18px] border rounded-[60px] font-[400] text-[12px] leading-[18px] text-[#1D1E2199]"
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-[600] text-[14px] leading-[18px] ml-[18px] "
              htmlFor="address"
            >
              Address
            </label>
            <input
              required
              className="max-w-[295px] md:max-w-[260px] py-[13px] px-[18px] border rounded-[60px] font-[400] text-[12px] leading-[18px] text-[#1D1E2199]"
              type="text"
              id="address"
              name="address"
              placeholder="Enter text"
            />
          </div>
        </div>
      </div>

      <div className="pt-10 pb-10">
        <FormSectionHeader
          className="mb-5"
          title="Payment method"
          description="You can pay us in a multiple way in our payment gateway system."
        />
        <RadioGroup
          name="payment_method"
          defaultValue="option-one"
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem
              className="bg-white text-greenColor border border-greenColor w-[20px] h-[20px] p-0"
              value="CASH_ON_DELIVERY"
              id="option-one"
            />
            <Label
              className="text-[14px] leading-[18px] font-[400]"
              htmlFor="option-one"
            >
              Cash On Delivery
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              className="bg-white text-greenColor border border-greenColor w-[20px] h-[20px] p-0"
              value="BANK"
              id="option-two"
            />
            <Label
              className="text-[14px] leading-[18px] font-[400]"
              htmlFor="option-two"
            >
              Bank
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="pt-10 border-t">
        <FormSectionHeader
          className="mb-5"
          title="Order details"
          description="Shipping and additionnal costs are calculated based on values you
            have entered."
        />
        <div className="p-5 bg-greenWhiteColor font-[600] text-[18px] leading-[25px] flex justify-between w-full rounded-[8px] mb-5">
          <p>Total:</p>
          <p>৳ {total}</p>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
};

export default CartForm;
