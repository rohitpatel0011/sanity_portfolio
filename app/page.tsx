// app/page.tsx
import Image from "next/image";
import { getProfile } from "@/sanity/query";
import type { ProfileType } from "@/types";

// Icons import kar rahe hain categories ke liye
import { FaLaptopCode, FaServer, FaDatabase, FaToolbox, FaRobot } from "react-icons/fa6";

// Category ke naam ke hisaab se icon return karne ka function
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes("frontend")) return <FaLaptopCode className="text-blue-400 text-2xl" />;
  if (name.includes("backend")) return <FaServer className="text-green-400 text-2xl" />;
  if (name.includes("database") || name.includes("cms")) return <FaDatabase className="text-yellow-400 text-2xl" />;
  if (name.includes("tools")) return <FaToolbox className="text-orange-400 text-2xl" />;
  if (name.includes("ai")) return <FaRobot className="text-purple-400 text-2xl" />;
  return <FaLaptopCode className="text-zinc-400 text-2xl" />; // Default icon
};

export default async function Home() {
  const profile: ProfileType[] = await getProfile();

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      {profile &&
        profile.map((data) => (
          <div key={data._id} className="flex flex-col items-start gap-y-10">

            {/* Profile Image {data.profileImage && ( <Image className="rounded-full object-cover border-4 border-zinc-800" src={data.profileImage.image} width={150} height={150} alt={data.profileImage.alt || "Profile Image"} /> )} */}
            {/* ... Upar ka Profile Image aur Bio wala code yahan same rahega ... */}

            <div className="flex flex-col gap-y-6">
               <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                 Hi, I'm {data.fullName} 👋
               </h1>
               <h2 className="text-xl text-zinc-400">{data.headline}</h2>
               <p className="text-base text-zinc-300 leading-relaxed max-w-2xl">{data.shortBio}</p>
            </div>

            {/* Naya Categorized Skills Section */}
            <div className="mt-8 w-full">
              <h3 className="text-2xl font-bold mb-8 border-b border-zinc-800 pb-4">Skills</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.skills?.map((category, index) => (
                  <div
                    key={index}
                    className="bg-[#1d1d20] border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center gap-x-3 mb-4">
                      {getCategoryIcon(category.categoryName)}
                      <h4 className="text-xl font-semibold text-zinc-100">
                        {category.categoryName}
                      </h4>
                    </div>

                    <ul className="flex flex-wrap gap-2">
                      {category.skillList?.map((skill, i) => (
                        <li
                          key={i}
                          className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-1.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-default"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
    </main>
  );
}