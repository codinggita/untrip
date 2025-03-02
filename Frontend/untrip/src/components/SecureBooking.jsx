import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Mail, Shield, User, ArrowRight, Lock } from "lucide-react";

export default function SecureBooking() {
  const [selectedInsurance, setSelectedInsurance] = useState("recommended");
  const location = useLocation();
  const { price = 14925, currency = "INR" } = location.state || {};
  const basePrice = Number(price);
  const taxesAndFees = 2685;
  const insuranceCost = selectedInsurance === "recommended" ? 1874.25 : 0;
  const totalPrice = (basePrice + taxesAndFees + insuranceCost).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Lock className="h-5 w-5 mr-2 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <BookingSection icon={<User className="text-blue-600" />} title="Guest Information">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="First name" id="firstName" placeholder="John" />
                  <InputField label="Last name" id="lastName" placeholder="Doe" />
                </div>
              </BookingSection>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <BookingSection icon={<Mail className="text-blue-600" />} title="Contact Details">
                <InputField
                  label="Email address"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  helperText="We'll send your booking confirmation here"
                />
                <InputField 
                  label="Phone number" 
                  id="phone" 
                  type="tel" 
                  placeholder="+91 98765 43210" 
                />
              </BookingSection>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <BookingSection icon={<CreditCard className="text-blue-600" />} title="Payment Information">
                <div className="flex gap-2 mb-4">
                  <div className="flex gap-2 items-center bg-gray-50 px-3 py-2 rounded border">
                    <span className="text-sm text-gray-500">We accept</span>
                    <div className="flex space-x-2">
                      <div className="w-8 h-5 bg-blue-600 rounded"></div>
                      <div className="w-8 h-5 bg-orange-500 rounded"></div>
                      <div className="w-8 h-5 bg-green-500 rounded"></div>
                    </div>
                  </div>
                </div>
                
                <InputField 
                  label="Card number" 
                  id="cardNumber" 
                  placeholder="•••• •••• •••• ••••" 
                />
                <div className="grid sm:grid-cols-3 gap-4">
                  <InputField label="Expiry date" id="expiry" placeholder="MM/YY" />
                  <InputField label="Security code" id="cvv" placeholder="CVV" />
                  <InputField label="Cardholder name" id="name" placeholder="As on card" />
                </div>
              </BookingSection>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <BookingSection icon={<Shield className="text-blue-600" />} title="Trip Protection">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Protect your trip against unexpected events and emergencies
                  </p>
                </div>
                
                <RadioGroup value={selectedInsurance} onValueChange={setSelectedInsurance} className="space-y-3">
                  <InsuranceOption
                    value="recommended"
                    title="Recommended: Trip Insurance"
                    description="Coverage for cancellations, delays, medical emergencies, and more"
                    price={`${currency === 'INR' ? '₹' : currency} ${1874.25.toLocaleString('en-IN')}`}
                  />
                  <InsuranceOption 
                    value="no-insurance" 
                    title="No thanks, I'll risk it" 
                    description="You'll be responsible for any costs due to changes or cancellations"
                  />
                </RadioGroup>
              </BookingSection>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Price Details</h3>
              <PriceSummary
                basePrice={basePrice}
                currency={currency}
                taxesAndFees={taxesAndFees}
                insuranceCost={insuranceCost}
                totalPrice={totalPrice}
                selectedInsurance={selectedInsurance}
              />

              <div className="mt-6">
                <Button className="w-full py-6 text-base" size="lg">
                  Complete Booking <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center">
                  <Lock className="h-3 w-3 mr-1" /> Secure, encrypted payment processing
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BookingSection({ icon, title, children }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function InputField({ label, id, helperText, ...props }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</Label>
      <Input id={id} className="h-10" {...props} />
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}

function InsuranceOption({ value, title, description, price }) {
  return (
    <div className="flex items-start space-x-3 border rounded-lg p-4 hover:border-blue-200 transition-colors">
      <RadioGroupItem value={value} id={value} className="mt-1" />
      <div className="grid gap-1">
        <Label htmlFor={value} className="font-medium">
          {title}
        </Label>
        {description && <p className="text-xs text-gray-500">{description}</p>}
        {price && <p className="text-sm font-medium text-blue-600 mt-1">{price}</p>}
      </div>
    </div>
  );
}

function PriceSummary({ basePrice, currency, taxesAndFees, insuranceCost, totalPrice, selectedInsurance }) {
  const currencySymbol = currency === 'INR' ? '₹' : currency;
  
  return (
    <div className="space-y-3">
      <PriceRow label="Room rate" value={`${currencySymbol} ${basePrice.toLocaleString('en-IN')}`} />
      <PriceRow label="Taxes and fees" value={`${currencySymbol} ${taxesAndFees.toLocaleString('en-IN')}`} />
      {selectedInsurance === "recommended" && 
        <PriceRow 
          label="Trip insurance" 
          value={`${currencySymbol} ${1874.25.toLocaleString('en-IN')}`} 
        />
      }
      <Separator className="my-3" />
      <PriceRow 
        label="Total (incl. all taxes)" 
        value={`${currencySymbol} ${Number(totalPrice).toLocaleString('en-IN')}`} 
        isTotal 
      />
    </div>
  );
}

function PriceRow({ label, value, isTotal = false }) {
  return (
    <div className={`flex justify-between ${isTotal ? "text-lg font-semibold" : ""}`}>
      <span className={isTotal ? "" : "text-gray-600"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
