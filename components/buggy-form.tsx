"use client";

import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  getFormProps,
  unstable_useControl as useControl,
  useForm,
  type FieldMetadata,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ComponentProps, ElementRef, useRef } from "react";
import { z } from "zod";
import { Button } from "./ui/button";

const schema = z.object({
  city: z.string(),
});

export function BuggyForm() {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <form {...getFormProps(form)} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <SelectConform
          meta={fields.city}
          items={[
            { name: "Medellín", value: "med" },
            { name: "Bogotá", value: "bog" },
          ]}
          placeholder="Select a city"
        />
        {fields.city.errors && (
          <p className="text-sm font-medium text-destructive">
            {fields.city.errors}
          </p>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export const SelectConform = ({
  meta,
  items,
  placeholder,
  ...props
}: {
  meta: FieldMetadata<string>;
  items: Array<{ name: string; value: string }>;
  placeholder: string;
} & ComponentProps<typeof Select>) => {
  const selectRef = useRef<ElementRef<typeof SelectTrigger>>(null);
  const control = useControl(meta);

  return (
    <>
      <select
        name={meta.name}
        defaultValue={meta.initialValue ?? ""}
        className="sr-only"
        ref={control.register}
        aria-hidden
        tabIndex={-1}
        onFocus={() => {
          selectRef.current?.focus();
        }}
      >
        <option value="" />
        {items.map((option) => (
          <option key={option.value} value={option.value} />
        ))}
      </select>

      <Select
        {...props}
        value={control.value ?? ""}
        onValueChange={control.change}
        onOpenChange={(open) => {
          if (!open) {
            control.blur();
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => {
            return (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};
