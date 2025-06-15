import { HomeIcon, BookmarkIcon, CreditCardIcon, CogIcon } from '@heroicons/react/24/outline'


export default function Sidebar({ activeTab, setActiveTab }) {
  const navigation = [
    { name: 'Projects', href: '/client-dashboard/projects', icon: HomeIcon, tab: 'projects' },
    { name: 'Shortlist', href: '/client-dashboard/shortlist', icon: BookmarkIcon, tab: 'shortlist' },
    { name: 'Payments', href: '/client-dashboard/payments', icon: CreditCardIcon, tab: 'payments' },
    { name: 'Settings', href: '/client-dashboard/settings', icon: CogIcon, tab: 'settings' },
  ]

  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 px-4 bg-gray-900 mt-16">
        <span className="text-white font-semibold text-lg">Client Dashboard</span>
      </div>
      <nav className="mt-5 flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.tab);
              window.history.pushState({}, '', item.href);
            }}
            className={`${
              activeTab === item.tab
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
          >
            <item.icon
              className={`${
                activeTab === item.tab ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
              } mr-3 flex-shrink-0 h-6 w-6`}
              aria-hidden="true"
            />
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  )
}

