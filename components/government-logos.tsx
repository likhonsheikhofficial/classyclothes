import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GovernmentLogos() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-center">Government Services</h3>

      <div className="flex justify-center mb-4">
        <Image
          src="/images/np-logo-set.png"
          alt="Government of Bangladesh"
          width={400}
          height={50}
          className="h-auto"
        />
      </div>

      <Tabs defaultValue="emergency">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
          <TabsTrigger value="govt">Government Services</TabsTrigger>
        </TabsList>

        <TabsContent value="emergency" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-3 flex items-center space-x-2">
                <div className="bg-red-100 rounded-full p-2">
                  <span className="text-red-600 text-xl font-bold">999</span>
                </div>
                <div>
                  <p className="text-sm font-medium">National Emergency</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 flex items-center space-x-2">
                <div className="bg-purple-100 rounded-full p-2">
                  <span className="text-purple-600 text-xl font-bold">333</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Government Info</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 flex items-center space-x-2">
                <div className="bg-orange-100 rounded-full p-2">
                  <span className="text-orange-600 text-xl font-bold">109</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Women & Child Helpline</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-3 text-center">
            <a href="/emergency-contacts" className="text-sm text-blue-600 hover:underline">
              View all emergency contacts
            </a>
          </div>
        </TabsContent>

        <TabsContent value="govt" className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-3 flex items-center space-x-2">
                <Image src="/images/mygov-logo.png" alt="MyGov" width={60} height={40} className="h-auto" />
                <div>
                  <p className="text-sm font-medium">MyGov Services</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 flex items-center space-x-2">
                <Image src="/images/a2i-logo-set.png" alt="a2i" width={60} height={40} className="h-auto" />
                <div>
                  <p className="text-sm font-medium">Digital Services</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-3 text-center">
            <a href="/government-services" className="text-sm text-blue-600 hover:underline">
              View all government services
            </a>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

