import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Mail, Shield, User } from "lucide-react"

export default function SecureBooking() {
  const [selectedInsurance, setSelectedInsurance] = useState("")
  const location = useLocation()
  const { price = 199, currency = "USD" } = location.state || {}
  const basePrice = Number(price)
  const taxesAndFees = 35.8
  const insuranceCost = selectedInsurance === "recommended" ? 24.99 : 0
  const totalPrice = (basePrice + taxesAndFees + insuranceCost).toFixed(2)

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Secure Booking</h1>

      <Card>
        <CardContent className="p-6 space-y-8">
          <BookingSection icon={<User />} title="Who's checking in?">
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="First name" id="firstName" placeholder="Enter first name" />
              <InputField label="Last name" id="lastName" placeholder="Enter last name" />
            </div>
          </BookingSection>

          <BookingSection icon={<Mail />} title="Contact information">
            <InputField
              label="Email address"
              id="email"
              type="email"
              placeholder="Enter email address"
              helperText="Booking confirmation will be sent to this email address"
            />
            <InputField label="Phone number" id="phone" type="tel" placeholder="Enter phone number" />
          </BookingSection>

          <BookingSection icon={<CreditCard />} title="Payment method">
            <div className="flex gap-2 mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-21%20160024-S9569UUTAXvMd0rj2MRmNrXQo6PSin.png"
                alt="Payment methods"
                width="200"
                height="30"
                className="h-8 w-auto"
              />
            </div>
            <InputField label="Card number" id="cardNumber" placeholder="0000 0000 0000 0000" />
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Expiry date" id="expiry" placeholder="MM/YY" />
              <InputField label="Security code" id="cvv" placeholder="CVV" />
            </div>
          </BookingSection>

          <BookingSection icon={<Shield />} title="Protect your stay">
            <RadioGroup value={selectedInsurance} onValueChange={setSelectedInsurance}>
              <InsuranceOption
                value="recommended"
                title="Recommended: Trip Insurance"
                description="Protect your trip against unexpected cancellations, delays, and medical emergencies."
                price="$24.99"
              />
              <InsuranceOption value="no-insurance" title="No thanks, I'll risk my stay" />
            </RadioGroup>

            <Separator className="my-6" />

            <PriceSummary
              basePrice={basePrice}
              currency={currency}
              taxesAndFees={taxesAndFees}
              insuranceCost={insuranceCost}
              totalPrice={totalPrice}
              selectedInsurance={selectedInsurance}
            />

            <Button className="w-full mt-6" size="lg">
              Complete Booking
            </Button>
          </BookingSection>
        </CardContent>
      </Card>
    </div>
  )
}

function BookingSection({ icon, title, children }) {
  return (
    <section>
      <CardHeader className="px-0 pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function InputField({ label, id, helperText, ...props }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
      {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
    </div>
  )
}

function InsuranceOption({ value, title, description, price }) {
  return (
    <div className="flex items-start space-x-3 border p-4 rounded-lg mt-2">
      <RadioGroupItem value={value} id={value} />
      <div className="grid gap-1.5">
        <Label htmlFor={value} className="font-medium">
          {title}
        </Label>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {price && <p className="text-sm font-medium">{price}</p>}
      </div>
    </div>
  )
}

function PriceSummary({ basePrice, currency, taxesAndFees, insuranceCost, totalPrice, selectedInsurance }) {
  return (
    <div className="space-y-2">
      <PriceRow label="Room rate" value={`${currency} ${basePrice.toFixed(2)}`} />
      <PriceRow label="Taxes and fees" value={`$${taxesAndFees.toFixed(2)}`} />
      {selectedInsurance === "recommended" && <PriceRow label="Trip insurance" value="$24.99" />}
      <Separator className="my-2" />
      <PriceRow label="Total" value={`${currency} ${totalPrice}`} isTotal />
    </div>
  )
}

function PriceRow({ label, value, isTotal = false }) {
  return (
    <div className={`flex justify-between ${isTotal ? "text-lg font-medium" : "text-sm"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

