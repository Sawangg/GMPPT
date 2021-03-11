import { useState } from "react";

export default function useConstructor(initializer) {
    useState(initializer);
}