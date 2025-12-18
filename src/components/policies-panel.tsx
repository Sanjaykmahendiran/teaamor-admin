
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export function PoliciesPanel() {
  return (
    <div className="space-y-6">
        <div className="flex flex-col gap-4 items-start p-2">
          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="terms">Terms</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="refund">Refund</TabsTrigger>
            </TabsList>
            <TabsContent value="terms" className="mt-4 space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">1. Acceptance of Terms</h4>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using Distrova's services, you accept and agree to be bound by the terms and
                  provision of this agreement.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">2. Use License</h4>
                <p className="text-gray-700 leading-relaxed">
                  Permission is granted to temporarily download one copy of Distrova's materials for personal,
                  non-commercial transitory viewing only.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">3. Disclaimer</h4>
                <p className="text-gray-700 leading-relaxed">
                  The materials on Distrova's platform are provided on an 'as is' basis. Distrova makes no warranties,
                  expressed or implied.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">4. Limitations</h4>
                <p className="text-gray-700 leading-relaxed">
                  In no event shall Distrova or its suppliers be liable for any damages arising out of the use or
                  inability to use the materials.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">5. Account Terms</h4>
                <p className="text-gray-700 leading-relaxed">
                  You are responsible for safeguarding the password and for all activities that occur under your
                  account.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">6. Payment Terms</h4>
                <p className="text-gray-700 leading-relaxed">
                  All payments are due immediately upon order placement. We accept various payment methods as displayed
                  during checkout.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">7. Governing Law</h4>
                <p className="text-gray-700 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of India.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="privacy" className="mt-4 space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Information We Collect</h4>
                <p className="text-gray-700 leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, make a
                  purchase, or contact us for support.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">How We Use Your Information</h4>
                <p className="text-gray-700 leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services, process
                  transactions, and communicate with you.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Information Sharing</h4>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your
                  consent, except as described in this policy.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Data Security</h4>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Your Rights</h4>
                <p className="text-gray-700 leading-relaxed">
                  You have the right to access, update, or delete your personal information. You may also opt out of
                  certain communications from us.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Contact Us</h4>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@distrova.com or +91
                  1800-123-4567.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="refund" className="mt-4 space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Refund Policy Overview</h4>
                <p className="text-gray-700 leading-relaxed">
                  Our refund policy allows for returns within 30 days of purchase, provided the item is in its original
                  condition and packaging.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Eligibility for Refund</h4>
                <p className="text-gray-700 leading-relaxed">
                  To be eligible for a refund, your item must be unused and in the same condition that you received it.
                  It must also be in the original packaging.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Processing Refunds</h4>
                <p className="text-gray-700 leading-relaxed">
                  Once your return is received and inspected, we will send you an email to notify you that we have
                  received your returned item. We will also notify you of the approval or rejection of your refund.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  )
}
