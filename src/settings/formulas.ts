export const FORMULAS = [
    { label: "(  )", value: "(  )" },
    // ===== 基本運算 =====
    { label: "+", value: " + " },
    { label: " -", value: " - " },
    { label: "*", value: " * " },
    { label: " /", value: " / " },
    { label: "%", value: " % " },
    { label: "Pow(a, b)", value: "Pow(a, b)" },

    // ===== 數學函式 =====
    { label: "Log(n)", value: "Log(n)" },
    { label: "Sqrt(n)", value: "Sqrt(n)" },
    { label: "Exp(n)", value: "Exp(n)" },

    // ===== 三角函數 =====
    { label: "Sin(n)", value: "Sin(n)" },
    { label: "Cos(n)", value: "Cos(n)" },
    { label: "Tan(n)", value: "Tan(n)" },

    // ===== 常用函式 =====
    { label: "Abs(n)", value: "Abs(n)" },
    { label: "Round(n, d)", value: "Round(n, d)" },
    { label: "Ceiling(n)", value: "Ceiling(n)" },
    { label: "Floor(n)", value: "Floor(n)" },

    // ===== 比較函式 =====
    // { label: "Max(a, b)", value: "Max(a, b)" },
    // { label: "Min(a, b)", value: "Min(a, b)" },

    // ===== 比較運算 =====
    // { label: " ==", value: " == " },
    // { label: " !=", value: " != " },
    // { label: " >", value: " > " },
    // { label: " <", value: " < " },
    // { label: " >=", value: " >= " },
    // { label: " <=", value: " <= " },
] as const;

export default FORMULAS;