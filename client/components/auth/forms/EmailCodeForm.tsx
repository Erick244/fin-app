"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useVerifyCodeContext } from "@/contexts/auth/VerifyCodeContext";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardEvent, KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const characterZodValidation = z.string().min(1).max(1);

const emailCodeSchema = z.object({
    character1: characterZodValidation,
    character2: characterZodValidation,
    character3: characterZodValidation,
    character4: characterZodValidation,
    character5: characterZodValidation,
    character6: characterZodValidation,
});

type EmailCodeFormData = z.infer<typeof emailCodeSchema>;

export function EmailCodeForm() {
    const form = useForm<EmailCodeFormData>({
        resolver: zodResolver(emailCodeSchema),
        defaultValues: {
            character1: "",
            character2: "",
            character3: "",
            character4: "",
            character5: "",
            character6: "",
        },
    });

    const [loading, setLoading] = useState<boolean>(false);
    const { verifyCode } = useVerifyCodeContext();

    async function onSubmit(data: EmailCodeFormData) {
        const code = Object.values(data).join("").replace(",", "");

        await verifyCode(code);
    }

    function onPaste(e: ClipboardEvent<HTMLInputElement>) {
        form.setFocus("character1");

        const pasteText = e.clipboardData.getData("text");
        const pasteTextLength = pasteText.length;
        const inputsLength = 6;

        if (pasteTextLength === inputsLength) {
            const pasteTextCharacteres = pasteText.split("");

            pasteTextCharacteres.forEach((char, i) => {
                const currentInputName = `character${i + 1}`;
                replaceFormValue(currentInputName, char);
            });
        }
    }

    function replaceFormValue(name: string, char: string) {
        form.setValue(name as any, char);
    }

    function onKeyUp(e: KeyboardEvent<HTMLInputElement>) {
        const currentInputId = +e.currentTarget.id;
        const key = e.key;
        const isNotTheControlOrEnter =
            !e.ctrlKey && key != "Control" && key != "Enter";

        if (key === "Backspace") {
            const isNotTheFirstInput = currentInputId != 1;
            const previusInputName = `character${currentInputId - 1}`;

            if (isNotTheFirstInput) {
                form.setFocus(previusInputName as any);
            }
        } else if (isNotTheControlOrEnter) {
            const isNotTheLastInput = currentInputId != 6;
            const nextInputName = `character${currentInputId + 1}`;

            if (isNotTheLastInput) {
                form.setFocus(nextInputName as any);
            }
        }
    }

    const OtpInputStyle = "text-center sm:w-14 w-10 text-lg font-bold";
    const OtpInputErrorStyle = "border-red-600 ring-offset-red-600";

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-center gap-2">
                    <FormField
                        control={form.control}
                        name="character1"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="1"
                                        onPaste={onPaste}
                                        onKeyUp={onKeyUp}
                                        placeholder="0"
                                        className={cn(
                                            OtpInputStyle,
                                            form.formState.errors.character1
                                                ? OtpInputErrorStyle
                                                : ""
                                        )}
                                        type="text"
                                        maxLength={1}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="character2"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="2"
                                        onPaste={onPaste}
                                        onKeyUp={onKeyUp}
                                        placeholder="0"
                                        className={cn(
                                            OtpInputStyle,
                                            form.formState.errors.character2
                                                ? OtpInputErrorStyle
                                                : ""
                                        )}
                                        type="text"
                                        maxLength={1}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="character3"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="3"
                                        onPaste={onPaste}
                                        onKeyUp={onKeyUp}
                                        placeholder="0"
                                        className={cn(
                                            OtpInputStyle,
                                            "mr-5",
                                            form.formState.errors.character3
                                                ? OtpInputErrorStyle
                                                : ""
                                        )}
                                        type="text"
                                        maxLength={1}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="character4"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="4"
                                        onPaste={onPaste}
                                        onKeyUp={onKeyUp}
                                        placeholder="0"
                                        className={cn(
                                            OtpInputStyle,
                                            form.formState.errors.character4
                                                ? OtpInputErrorStyle
                                                : ""
                                        )}
                                        type="text"
                                        maxLength={1}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="character5"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="5"
                                        onPaste={onPaste}
                                        onKeyUp={onKeyUp}
                                        placeholder="0"
                                        className={cn(
                                            OtpInputStyle,
                                            form.formState.errors.character5
                                                ? OtpInputErrorStyle
                                                : ""
                                        )}
                                        type="text"
                                        maxLength={1}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="character6"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        id="6"
                                        {...field}
                                        onPaste={onPaste}
                                        onKeyUp={onKeyUp}
                                        placeholder="0"
                                        className={cn(
                                            OtpInputStyle,
                                            form.formState.errors.character6
                                                ? OtpInputErrorStyle
                                                : ""
                                        )}
                                        type="text"
                                        maxLength={1}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full">
                    {loading ? <Spinner /> : "Submit"}
                </Button>
            </form>
        </Form>
    );
}
