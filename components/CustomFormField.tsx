"use client";

import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { FormFieldType } from "./forms/PatientForm";
import { CalendarHeart, LucideIcon } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import DatePicker from "react-datepicker";
import { Checkbox } from "./ui/checkbox";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

interface CustomProps<T extends FieldValues> {
  control: Control<T, Record<string, unknown>>;
  fieldType: FormFieldType;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (
    field: ControllerRenderProps<T, Path<T>>,
  ) => React.ReactNode;
}

const RenderField = <T extends FieldValues>({
  field,
  props,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  props: CustomProps<T>;
}) => {
  const {
    fieldType,
    icon: Icon,
    placeholder,
    showTimeSelect,
    dateFormat,
    disabled,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-[#363A3D] bg-[#1A1D21]">
          {Icon && <Icon className="ml-2 my-1.5 h-5 w-5 text-gray-400" />}
          <Input
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            className="border-0 bg-transparent"
          />
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          defaultCountry="NG"
          placeholder={placeholder}
          international
          withCountryCallingCode
          value={field.value as E164Number | undefined}
          onChange={field.onChange}
          onBlur={field.onBlur}
          className="mt-1 h-9 rounded-md px-3 text-sm border bg-[#1A1D21] border-[#363A3D]"
        />
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-3">
          <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label
            htmlFor={props.name}
            className="text-sm text-gray-300 cursor-pointer"
          >
            {props.label}
          </label>
        </div>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center rounded-md border border-[#363A3D] bg-[#1A1D21] px-2">
          <CalendarHeart className="h-5 w-5 text-gray-400" />

          <DatePicker
            selected={field.value ?? undefined}
            onChange={(date: Date | null) => field.onChange(date ?? undefined)}
            showTimeSelect={showTimeSelect ?? false}
            dateFormat={dateFormat ?? "MM/dd/yyyy"}
            placeholderText={placeholder || "Select date"}
            className="w-full h-7 bg-transparent outline-none text-white overflow-hidden border-transparent placeholder:text-dark-600 text-14-medium rounded-md px-3"
          />
        </div>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton?.(field) ?? null;
    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={props.placeholder}
          {...field}
          className="bg-dark-400 placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={props.disabled}
        />
      );
    case FormFieldType.SELECT:
      return (
        <Select value={field.value || ""} onValueChange={field.onChange}>
          <SelectTrigger className="mt-1 bg-[#1A1D21] border border-[#363A3D] text-white">
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>

          <SelectContent className="bg-[#1A1D21] text-white">
            {props.children}
          </SelectContent>
        </Select>
      );
    default:
      return null;
  }
};

const CustomFormField = <T extends FieldValues>({
  control,
  name,
  label,
  fieldType,
  ...props
}: CustomProps<T>) => {
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FieldLabel className="text-base text-gray-300">
                {label}
              </FieldLabel>
            )}

            <RenderField
              field={field}
              props={{ ...props, fieldType, name, control, label }}
            />

            {fieldState.error && (
              <FieldError
                errors={[fieldState.error]}
                className="text-red-500"
              />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default CustomFormField;
