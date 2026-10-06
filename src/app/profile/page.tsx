// 'use client'
// import { authClient } from '@/lib/auth-client';
// import { useState } from 'react';

// const ProfilePage = () => {
//     const [show, setShow] = useState(false);

//     const { data: session } = authClient.useSession();
//     const user = session?.user;

//     const handleSignOut = async () => {
//         await authClient.signOut();
//     };

//     const handleUpgradeProfile = async (e: React.SubmitEvent<HTMLElement>) => {
//         e.preventDefault();

//         const UpdateData = new FormData(e.target);
//         const UpDateUser = Object.fromEntries(UpdateData.entries()) as {
//             name: string;
//             image: string;
//         };

//         await authClient.updateUser({
//             ...UpDateUser,
//         });
//     }
//     // const handleShow = () => {
//     //     setShow(true);
//     // }

//     return (
//         <div>
//             <h1>YOUR PROFILE</h1>
//             <div className="avatar">
//                 <div className="mask mask-hexagon-2 w-24">
//                     <img alt="Tailwind-CSS-Avatar-component" src={user?.image as string} />
//                 </div>
//             </div>
//             <div>
//                 <h2 className="text-xl font-semibold text-gray-500 tracking-wide truncate">{user?.name}</h2>
//                 <p className="text-sm font-semibold text-gray-500 tracking-wide truncate">{user?.email}</p>
//             </div>
//             <button onClick={()=> setShow(!show)}>Vew Profile</button>
//             {
//                 show === true && <div>
//                     <div>
//                         <form onSubmit={handleUpgradeProfile}>

//                             <fieldset>
//                                 <label className="label text-sm font-medium">Name</label>
//                                 <input
//                                     name="name"
//                                     type="text"
//                                     className="input input-bordered w-full"
//                                     placeholder="Enter Your Name"
//                                     required
//                                 />

//                                 <label className="label text-sm font-medium">Image URL (Optional)</label>
//                                 <input
//                                     name="image"
//                                     type="url"
//                                     className="input input-bordered w-full"
//                                     placeholder="https://example.com/image.jpg"
//                                 />

//                                 <button type="submit" className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 active:scale-95 transition-all duration-200 whitespace-nowrap">
//                                     Update Profile
//                                 </button>
//                             </fieldset>

//                         </form>
//                     </div>
//                     <button onClick={handleSignOut} className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 active:scale-95 transition-all duration-200 whitespace-nowrap">
//                         সাইন আউট
//                     </button>
//                 </div>
//             }
//         </div>
//     );
// };

// export default ProfilePage;


'use client';

import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success('সফলভাবে সাইন আউট হয়েছে!');
    } catch (error) {
      toast.error('সাইন আউট করতে সমস্যা হয়েছে!');
    }
  };

  // প্রোফাইল আপডেট হ্যান্ডলার
  const handleUpgradeProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const image = formData.get('image') as string;

    try {
      await authClient.updateUser({
        name: name || user?.name,
        image: image || user?.image,
      });

      toast.success('প্রোফাইল আপডেট হয়েছে!');
      setShow(false);
    } catch (err) {
      toast.error('আপডেট করতে ব্যর্থ হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {/* Toast Container local-এ রাখলেও কাজ করবে */}
      <Toaster position="top-center" />

      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 text-center text-white shadow-xl">
        {/* হেডার */}
        <h1 className="mb-4 text-xl font-bold tracking-wide">YOUR PROFILE</h1>

        {/* অ্যাভাটার */}
        <div className="avatar mb-3 flex justify-center">
          <div className="mask mask-hexagon-2 w-24">
            <img
              src={user?.image || 'https://via.placeholder.com/150'}
              alt="Profile"
            />
          </div>
        </div>

        {/* ব্যবহারকারীর নাম ও ইমেইল */}
        <h2 className="truncate text-lg font-semibold">{user?.name || 'User Name'}</h2>
        <p className="mb-5 truncate text-sm text-gray-400">{user?.email || 'user@email.com'}</p>

        {/* প্রোফাইল দেখা/এডিট করার টোগল বাটন */}
        <button
          onClick={() => setShow(!show)}
          className="btn btn-outline btn-sm mb-3 w-full border-slate-700 text-white"
        >
          {show ? 'Close Edit' : 'View Profile'}
        </button>

        {/* এডিট ফর্ম এবং সাইন আউট */}
        {show && (
          <div className="mt-4 space-y-4 border-t border-slate-800 pt-4 text-left">
            <form onSubmit={handleUpgradeProfile} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={user?.name || ''}
                  className="input input-bordered w-full bg-slate-950 text-sm text-white"
                  placeholder="Enter Your Name"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-400">Image URL (Optional)</label>
                <input
                  name="image"
                  type="url"
                  defaultValue={user?.image || ''}
                  className="input input-bordered w-full bg-slate-950 text-sm text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-block btn-sm mt-2"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>

            <button
              onClick={handleSignOut}
              className="btn btn-error btn-block btn-sm text-white"
            >
              সাইন আউট
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;