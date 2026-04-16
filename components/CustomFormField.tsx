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
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import { Checkbox } from "./ui/checkbox";

interface CustomProps<T extends FieldValues> {
  control: Control<T>;
  fieldType: FormFieldType;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
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
  } = props;
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-[#363A3D] bg-[#1A1D21]">
          {Icon && (
            <Icon className="flex justify-center items-center ml-2 text-gray-400 my-1.5 h-5 w-5" />
          )}

          <Input {...field} placeholder={placeholder} className="border-0 " />
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
          name={field.name}
          className="mt-1 h-9 rounded-md px-3 text-sm border bg-[#1A1D21] placeholder:text-[#76828D] border-[#363A3D] input-phone"
        />
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label
            htmlFor={props.name}
            className="cursor-pointer text-sm font-medium text-dark-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none"
          >
            {props.label}
          </label>
        </div>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center rounded-md border border-[#363A3D] bg-[#1A1D21] px-2">
          <CalendarHeart className="text-gray-400 mr-2 h-5 w-5" />

          <DatePicker
            selected={field.value || null}
            onChange={(date: Date | null) => field.onChange(date)}
            showTimeSelect={showTimeSelect ?? false}
            dateFormat={dateFormat ?? "MM/dd/yyyy"}
            placeholderText={placeholder || "Select date"}
            className="w-full bg-transparent outline-none text-white"
          />
        </div>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      break;
  }
};

const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
  const { control, fieldType, name, label } = props;
  return (
    <div>
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
              <RenderField field={field} props={props} />

              {fieldState.error && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-red-700"
                />
              )}
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  );
};

export default CustomFormField;
