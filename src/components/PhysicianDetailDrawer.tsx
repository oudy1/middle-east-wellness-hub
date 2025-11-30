import { Physician } from "@/lib/physicianData";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Clock, Globe, GraduationCap, Building2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type PhysicianDetailDrawerProps = {
  physician: Physician | null;
  open: boolean;
  onClose: () => void;
};

export const PhysicianDetailDrawer = ({ physician, open, onClose }: PhysicianDetailDrawerProps) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  if (!physician) return null;

  const fullName = `${physician.title} ${physician.firstName} ${physician.lastName}`;
  const hasContact = physician.phone || physician.email;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(physician.address)}`;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side={isRTL ? "left" : "right"} 
        className="w-full sm:max-w-lg overflow-y-auto"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <SheetHeader className={isRTL ? "text-right" : "text-left"}>
          <SheetTitle className="text-2xl font-bold text-primary">
            {fullName}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Specialty & Subspecialty */}
          <div>
            <h3 className={`text-sm font-semibold text-muted-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'التخصص' : 'Specialty'}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="text-sm">
                {isRTL && physician.specialty.includes('Family Medicine') ? 'طب الأسرة' : physician.specialty}
              </Badge>
              {physician.subspecialty && (
                <Badge variant="outline" className="text-sm">
                  {physician.subspecialty}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Credentials */}
          {physician.credentials.length > 0 && (
            <>
              <div>
                <h3 className={`text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <GraduationCap className="h-4 w-4" />
                  {isRTL ? 'المؤهلات' : 'Credentials'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {physician.credentials.map((cred, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {cred}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Clinic/Hospital */}
          <div>
            <h3 className={`text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Building2 className="h-4 w-4" />
              {isRTL ? 'العيادة / المستشفى' : 'Clinic / Hospital'}
            </h3>
            <p className={`text-sm ${isRTL ? 'text-right' : 'text-left'}`}>{physician.clinicName}</p>
            {physician.affiliatedHospitals.length > 0 && (
              <div className="mt-2">
                {physician.affiliatedHospitals.map((hospital, idx) => (
                  <p key={idx} className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                    {hospital}
                  </p>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Address & City */}
          <div>
            <h3 className={`text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <MapPin className="h-4 w-4" />
              {isRTL ? 'العنوان' : 'Address'}
            </h3>
            <p className={`text-sm ${isRTL ? 'text-right' : 'text-left'}`}>{physician.address}</p>
            <p className={`text-xs text-muted-foreground mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'المدينة' : 'City'}: {physician.city}
            </p>
          </div>

          <Separator />

          {/* Contact Info */}
          {hasContact && (
            <>
              <div>
                <h3 className={`text-sm font-semibold text-muted-foreground mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
                </h3>
                <div className="space-y-2">
                  {physician.phone && (
                    <a 
                      href={`tel:${physician.phone}`}
                      className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <Phone className="h-4 w-4" />
                      <span>{physician.phone}</span>
                    </a>
                  )}
                  {physician.email && (
                    <a 
                      href={`mailto:${physician.email}`}
                      className={`flex items-center gap-2 text-sm hover:text-primary transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <Mail className="h-4 w-4" />
                      <span className="break-all">{physician.email}</span>
                    </a>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Office Hours */}
          <div>
            <h3 className={`text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock className="h-4 w-4" />
              {isRTL ? 'ساعات العمل' : 'Office Hours'}
            </h3>
            <p className={`text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL && physician.officeHours === 'By Appointment' ? 'بالمواعيد' : physician.officeHours}
            </p>
          </div>

          <Separator />

          {/* Languages */}
          <div>
            <h3 className={`text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Globe className="h-4 w-4" />
              {isRTL ? 'اللغات' : 'Languages'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {physician.languages.map((lang, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {isRTL && lang === 'Arabic' ? 'العربية' : 
                   isRTL && lang === 'English' ? 'الإنجليزية' : lang}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            {physician.phone && (
              <Button 
                className="w-full" 
                asChild
                dir={isRTL ? "rtl" : "ltr"}
              >
                <a href={`tel:${physician.phone}`}>
                  <Phone className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {isRTL ? 'اتصل' : 'Call'}
                </a>
              </Button>
            )}
            {physician.email && (
              <Button 
                className="w-full" 
                variant="outline" 
                asChild
                dir={isRTL ? "rtl" : "ltr"}
              >
                <a href={`mailto:${physician.email}`}>
                  <Mail className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {isRTL ? 'بريد إلكتروني' : 'Email'}
                </a>
              </Button>
            )}
            <Button 
              className="w-full" 
              variant="secondary" 
              asChild
              dir={isRTL ? "rtl" : "ltr"}
            >
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {isRTL ? 'الاتجاهات' : 'Get Directions'}
                <ExternalLink className={`h-3 w-3 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
