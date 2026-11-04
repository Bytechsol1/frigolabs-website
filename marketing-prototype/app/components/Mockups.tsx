import { Icon, type IconName } from './Icon';
import { LogoMark } from './Logo';

// All names and values below are fictional sample data. No real patient information.

type Status = 'progress' | 'shipped' | 'available';
const statusLabel: Record<Status, string> = { progress: 'In Progress', shipped: 'Kit Shipped', available: 'Results Available' };

function Pill({ status }: { status: Status }) {
  return <span className={`pill pill--${status}`}>{statusLabel[status]}</span>;
}

function MiniLogo() {
  return (
    <span className="m-logo">
      <LogoMark className="m-logo__mark" />
      <span><b>FRIGO</b> FLOW</span>
    </span>
  );
}

const dashboardNav: [IconName, string][] = [
  ['grid', 'Dashboard'],
  ['users', 'Patients'],
  ['clipboard', 'Test Orders'],
  ['file', 'Results'],
  ['message', 'Messages'],
  ['settings', 'Clinic Settings'],
];

const stats: [IconName, string, string][] = [
  ['users', '124', 'Active Patients'],
  ['clipboard', '37', 'Open Test Orders'],
  ['clock', '29', 'In Progress'],
  ['flask', '86', 'Results Available'],
];

const recentOrders: [string, string, Status, string][] = [
  ['John Miller', 'Comprehensive Panel', 'progress', 'Nov 3, 2026'],
  ['Sarah Davis', 'Hormone Health Panel', 'shipped', 'Nov 2, 2026'],
  ['Michael Reed', 'Metabolic Panel', 'available', 'Nov 1, 2026'],
];

export function DashboardScreen() {
  return (
    <div className="dash">
      <aside className="dash__side">
        <MiniLogo />
        <ul>
          {dashboardNav.map(([icon, label], i) => (
            <li key={label} className={i === 0 ? 'is-active' : undefined}><Icon name={icon} />{label}</li>
          ))}
        </ul>
      </aside>
      <div className="dash__main">
        <div className="dash__top">
          <div>
            <strong>Dashboard</strong>
            <small>NexGen Wellness Clinic</small>
          </div>
          <div className="dash__user">
            <Icon name="bell" />
            <span className="avatar">EC</span>
            <span><b>Dr. Emily Carter</b><small>Physician</small></span>
            <Icon name="chevronDown" />
          </div>
        </div>
        <div className="dash__stats">
          {stats.map(([icon, value, label]) => (
            <div key={label} className="stat"><Icon name={icon} /><b>{value}</b><small>{label}</small></div>
          ))}
        </div>
        <div className="dash__card">
          <strong>Recent Test Orders</strong>
          <div className="m-table m-table--4">
            <span className="m-th">Patient</span><span className="m-th">Test Panel</span><span className="m-th">Status</span><span className="m-th">Updated</span>
            {recentOrders.map(([name, panel, status, date]) => (
              <div className="m-row" key={name}><span>{name}</span><span>{panel}</span><span><Pill status={status} /></span><span>{date}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PatientPhone({ brand = 'frigo' }: { brand?: 'frigo' | 'nexgen' }) {
  const items: [IconName, string, string][] = brand === 'frigo'
    ? [['clipboard', 'My Tests', 'Track your test orders'], ['file', 'Results', 'View your lab results'], ['message', 'Messages', 'Updates from your clinic']]
    : [['clipboard', 'Your Tests', ''], ['file', 'Results', ''], ['message', 'Messages', '']];
  return (
    <div className={`phone phone--${brand}`}>
      <div className="phone__screen">
        <div className="papp">
          <div className="papp__bar">
            {brand === 'frigo' ? <><Icon name="chevronLeft" /><MiniLogo /><Icon name="menu" /></> : <span className="nexgen"><Icon name="leaf" />NexGen Wellness</span>}
          </div>
          {brand === 'frigo' && <p className="papp__hello">Welcome, Sarah</p>}
          <ul>
            {items.map(([icon, title, sub]) => (
              <li key={title}>
                <span className="papp__icon"><Icon name={icon} /></span>
                <span className="papp__text"><b>{title}</b>{sub && <small>{sub}</small>}</span>
                <Icon name="chevronRight" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function HeroDevices() {
  return (
    <div className="devices" role="img" aria-label="Frigo Flow clinic dashboard on a laptop and the patient portal on a phone, shown with fictional sample data">
      <div className="laptop">
        <div className="laptop__screen"><DashboardScreen /></div>
        <div className="laptop__base" />
      </div>
      <PatientPhone />
    </div>
  );
}

const testOrders: [string, string, Status, string][] = [
  ['Jennifer Hall', 'Cardiometabolic Panel', 'progress', '—'],
  ['Daniel Price', 'Hormone Panel', 'shipped', 'Nov 4, 2026'],
  ['Lisa Gomez', 'Wellness Panel', 'available', 'Oct 30, 2026'],
];

export function TestOrdersPanel() {
  return (
    <div className="orders" role="img" aria-label="Test orders table showing fictional patients and their testing status">
      <div className="orders__app">
        <aside className="orders__side">
          <LogoMark className="orders__mark" />
          {(['grid', 'users', 'clipboard', 'file'] as IconName[]).map(icon => <span key={icon}><Icon name={icon} /></span>)}
        </aside>
        <div className="orders__main">
          <div className="orders__top">
            <strong>Test Orders</strong>
            <span className="orders__search"><Icon name="search" />Search patients...</span>
          </div>
          <div className="m-table m-table--4">
            <span className="m-th">Patient</span><span className="m-th">Test Panel</span><span className="m-th">Status</span><span className="m-th">Collection</span>
            {testOrders.map(([name, panel, status, date]) => (
              <div className="m-row" key={name}><span>{name}</span><span>{panel}</span><span><Pill status={status} /></span><span>{date}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandedDevices() {
  const nav: [IconName, string][] = [['grid', 'Dashboard'], ['users', 'Patients'], ['file', 'Results'], ['message', 'Messages']];
  const cards: [IconName, string, string][] = [['users', '86', 'Patients'], ['box', '12', 'Kit Shipped'], ['file', '41', 'Results']];
  return (
    <div className="branded" role="img" aria-label="Example clinic-branded portal for the fictional NexGen Wellness clinic, on desktop and mobile">
      <div className="browser">
        <div className="browser__bar"><Icon name="chevronLeft" /><span className="nexgen"><Icon name="leaf" />NexGen Wellness</span></div>
        <div className="browser__app">
          <aside>
            {nav.map(([icon, label], i) => <span key={label} className={i === 1 ? 'is-active' : undefined}><Icon name={icon} />{label}</span>)}
          </aside>
          <div className="browser__main">
            <strong>Welcome, Dr. Carter</strong>
            <small>Here’s today’s overview</small>
            <div className="browser__cards">
              {cards.map(([icon, value, label]) => <span key={label}><Icon name={icon} /><b>{value}</b><small>{label}</small></span>)}
            </div>
          </div>
        </div>
      </div>
      <PatientPhone brand="nexgen" />
    </div>
  );
}
