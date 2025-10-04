import React from "react";
import { FaBuilding, FaFilePdf, FaRegEnvelope, FaUserTie } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";

interface CompanyInformationCardProps {
  company: any;
}

type InfoFieldProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isLink?: boolean;
  link?: string;
};

const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  icon,
  isLink = false,
  link,
}) => {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <div className="flex items-center">
        {icon && <span className="mr-2 text-gray-600">{icon}</span>}
        {isLink && link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-sm font-semibold text-gray-800 hover:underline"
          >
            {value}
          </a>
        ) : (
          <span className="flex-1 text-sm font-semibold text-gray-800">
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

const CompanyInformationCard: React.FC<CompanyInformationCardProps> = ({ company }) => {
  const documentIcon = <FaBuilding className="text-primaryColor-500" />;
  const emailIcon = <FaRegEnvelope />;
  const phoneIcon = <FiPhone />;
  const licenseIcon = <FaFilePdf className="text-red-500" />;
  const ownerIcon = <FaUserTie className="text-purple-600" />;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full my-3">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        {documentIcon}
        <h2 className="text-lg font-semibold text-gray-800">
          Company Information
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Company Info */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <InfoField label="Company Name" value={company.companyName} />
          <InfoField label="Company Email" value={company.companyEmail} icon={emailIcon} />
          <InfoField label="Company Contact" value={company.companyContact} icon={phoneIcon} />

          <div className="mt-6 border border-gray-200 rounded-lg p-3">
            <InfoField
              label="Business License"
              value={company.proofDocument?.split("/").pop() || "No file"}
              icon={licenseIcon}
              isLink={true}
              link={company.proofDocument}
            />
          </div>
        </div>

        {/* Right: Owner/Manager Info */}
        {company.manager && (
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center space-x-2 mb-4">
              {ownerIcon}
              <h3 className="text-md font-semibold text-gray-800">
                Company Owner / Manager
              </h3>
            </div>

            <InfoField label="Full Name" value={company.manager.fullName} />
            <InfoField label="Email" value={company.manager.email} icon={emailIcon} />
            <InfoField label="Phone" value={company.manager.phoneNumber} icon={phoneIcon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInformationCard;
