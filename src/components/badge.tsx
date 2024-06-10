import { Text } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  text: string;
  className?: string;
}

const Badge = ({ text, className }: BadgeProps) => {
  return (
    <Text
      className={cn(
        "rounded-full bg-primaryRed-900/20 px-2 py-1 font-ralewaySemiBold text-[13px] text-primaryRed-900",
        className,
      )}
    >
      {text}
    </Text>
  );
};

export default Badge;
