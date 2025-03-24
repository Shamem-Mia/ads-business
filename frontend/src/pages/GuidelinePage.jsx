import React from "react";
import { Clock, MousePointer, Coins, Phone, AlertCircle } from "lucide-react";

const GuidelinePage = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="bg-base-200 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">How to Earn Money</h1>
          <p className="mt-2 text-zinc-400">
            Follow these steps to earn money from the website
          </p>
        </div>

        {/* Guidelines */}
        <div className="mt-8 space-y-6">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MousePointer className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Step 1</p>
              <p className="text-lg font-semibold">
                Click on the "Task" or "Website Ads" on the Home Page.
              </p>
              <p className="text-zinc-400 mt-1">
                হোম পেজে দেওয়া "Task" বা "Website Ads" এ ক্লিক করুন।
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MousePointer className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Step 2</p>
              <p className="text-lg font-semibold">
                After clicking, you will see several ad links. Click on them.
              </p>
              <p className="text-zinc-400 mt-1">
                ক্লিক করার পর বেশ কিছু এড এর লিংক দেখতে পাবেন। এগুলোতে ক্লিক
                করুন।
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Step 3</p>
              <p className="text-lg font-semibold">
                Wait for at least 8 seconds after clicking each ad.
              </p>
              <p className="text-zinc-400 mt-1">
                প্রতিটা এড এ ক্লিক করার পর কমপক্ষে ৮ সেকেন্ড অপেক্ষা করুন।
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Step 4</p>
              <p className="text-lg font-semibold">
                After completing the steps, coins will be added to your "Earn
                Coin" balance.
              </p>
              <p className="text-zinc-400 mt-1">
                তারপর আপনার "Earn Coin" এ প্রতিটা ক্লিকের জন্য কয়েন জমা হবে।
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Step 5</p>
              <p className="text-lg font-semibold">
                Once you have at least ** coins, click on the "Withdraw" option
                in the sidebar.
              </p>
              <p className="text-zinc-400 mt-1">
                কমপক্ষে ** কয়েন জমা হলে হোমপেজের সাইডবারে দেওয়া "Withdraw" অপশনে
                ক্লিক করুন।
              </p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Step 6</p>
              <p className="text-lg font-semibold">
                Wait for some time, and the money will be sent to your provided
                number.
              </p>
              <p className="text-zinc-400 mt-1">
                কিছুক্ষণ পর আপনার দেওয়া নাম্বারে টাকা চলে যাবে।
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Contact</p>
              <p className="text-lg font-semibold">
                For any issues, go to the "Contact" option and reach out.
              </p>
              <p className="text-zinc-400 mt-1">
                যেকোনও প্রয়োজনে "Contact" অপশনে গিয়ে যোগাযোগ করতে পারেন।
              </p>
            </div>
          </div>

          {/* Important Note */}
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Important Note</p>
              <p className="text-lg font-semibold">
                Do not message the developer about withdrawals. They are not
                involved in the website's operations.
              </p>
              <p className="text-zinc-400 mt-1">
                ওয়েবসাইটের টাকা Withdraw সম্পর্কে ডেভেলপারকে কোনও মেসেজ দিবেন
                না। ওয়েবসাইটের কার্যকলাপের সাথে উনি যুক্ত নেই।
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-zinc-400">
          <p>Thank you for using our website!</p>
          <p>ওয়েবসাইট ব্যবহার করার জন্য ধন্যবাদ!</p>
        </div>
      </div>
    </div>
  );
};

export default GuidelinePage;
