'use client'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'
import {FormState, SignupFormSchema} from "@/app/lib/definitions";

export async function signup(state: FormState, formData: FormData) {
    const supabase = createClient();

    // Validate input fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;

    try {
        // Sign up user
        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            console.error('Error during signup:', signUpError);
            redirect('/error');
        }

        // Insert additional user data into the database
        const { data: userData, error: insertError } = await supabase
            .from('users')
            .insert([
                { username: name },
                { email: email }
            ]);

        if (insertError) {
            console.error('Error inserting user data:', insertError);
            return {
                message: 'An error occurred while creating your account.',
            };
        }

        // Revalidate and redirect
        revalidatePath('/');
        redirect('/');
    } catch (error) {
        console.error('Unexpected error:', error);
        return {
            message: 'An unexpected error occurred. Please try again later.',
        };
    }
}