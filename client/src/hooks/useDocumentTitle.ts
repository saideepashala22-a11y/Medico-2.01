import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface HospitalSettings {
  hospitalName: string;
  hospitalSubtitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  accreditation?: string;
}

export function useDocumentTitle() {
  const { data: hospitalSettings } = useQuery<HospitalSettings>({
    queryKey: ['/api/hospital-settings'],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  useEffect(() => {
    const hospitalName = hospitalSettings?.hospitalName || 'NAKSHATRA HOSPITAL';
    document.title = `${hospitalName} - Management System`;
  }, [hospitalSettings?.hospitalName]);

  return hospitalSettings;
}