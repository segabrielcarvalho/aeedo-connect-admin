"use client";

interface ProfileFieldProps {
  label: string;
  value: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => {
  return (
    <div className="pt-6 sm:flex">
      <dt className="font-medium text-sm text-gray-600 sm:w-64 sm:flex-none sm:pr-6">
        {label}
      </dt>
      <dd className="mt-1 flex justify-start gap-x-6 sm:mt-0 sm:flex-auto">
        <div className="text-gray-900 text-sm">{value}</div>
      </dd>
    </div>
  );
};

export default ProfileField;
