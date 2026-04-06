import { useEffect, useState } from "react"
import { useProfile, useUpdateProfile, useChangePassword } from "../hooks/useProfile"
import ProfileDetails from "../components/profile/ProfileDetails"
import ChangePasswordForm from "../components/profile/ChangePasswordForm"

export default function Profile() {
    const { data: profile, isLoading } = useProfile()
    const updateProfile = useUpdateProfile()
    const changePassword = useChangePassword()

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone_number: "",
    })

    useEffect(() => {
        if (profile) {
            setForm({
                name: profile.name || "",
                email: profile.email || "",
                phone_number: profile.phone_number || "",
            })
        }
    }, [profile])

    const handleSave = () => {
        updateProfile.mutate({
            name: form.name,
            phone_number: form.phone_number,
        })
    }

    const handleChangePassword = async (data) => {
        return await changePassword.mutateAsync(data)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading profile...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-purple text-white">
            <section className="pt-24 pb-40 relative min-h-screen flex justify-center px-6">
                <div className="p-8 space-y-6">
                    <h1 className="text-4xl font-bold text-center">My Profile</h1>

                    <ProfileDetails
                        form={form}
                        setForm={setForm}
                        onSave={handleSave}
                        isSaving={updateProfile.isPending}
                    />

                    <ChangePasswordForm
                        onSubmit={handleChangePassword}
                        isSaving={changePassword.isPending}
                    />

                </div>
            </section>
        </div>
    )
}