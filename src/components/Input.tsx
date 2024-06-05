import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";
import React from "react";
import { cn } from "../lib/utils";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
}

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, ...props }, ref) => (
    <View className={cn("flex flex-col gap-1.5")}>
      {label && <Text className={cn("text-base", labelClasses)}>{label}</Text>}
      <TextInput
        ref={ref}
        className={cn(className, "rounded-lg border px-4 py-2.5")}
        {...props}
      />
    </View>
  ),
);

Input.displayName = "Input";

export { Input };
