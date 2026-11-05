import { Icon, type IconName } from './Icon';
import { LogoMark } from './Logo';

// Product previews styled after the real Frigo Flow web app (top navigation bar).
// All names and values below are fictional sample data. No real clinic or patient information.

type Status = 'progress' | 'shipped' | 'available';
const statusLabel: Record<Status, string> = { progress: 'In Progress', shipped: 'Kit Shipped', available: 'Results Available' };

function Pill({ status }: { status: Status }) {
  return <span className={`pill pill--${status}`}>{statusLabel[status]}</span>;
}

function MiniLogo() {
  return (
    <span className="m-logo">
      <LogoMark className="m-logo__mark" />
      <span className="m-logo__divider" />
      <span><b>FRIGO</b> FLOW</span>
    </span>
  );
}

function NexGenLogo() {
  return <span className="nexgen"><Icon name="leaf" />NexGen Wellness</span>;
}

const appNav = ['Dashboard', 'Clinics', 'Clinic Branding', 'Patients', 'Sessions', 'Lab Results'];

/** Floating top bar used by the real web app: logo · pill menu · bell, settings, user. */
function TopBar({ items, active, brand = 'frigo', user = 'Dr. Collins', initial = 'M', compact = false }: {
  items: string[]; active: string; brand?: 'frigo' | 'nexgen'; user?: string; initial?: string; compact?: boolean;
}) {
  return (
    <div className={`m-top m-top--${brand}`}>
      {brand === 'frigo' ? <MiniLogo /> : <NexGenLogo />}
      <ul className="m-top__nav">
        {items.map(item => <li key={item} className={item === active ? 'is-active' : undefined}>{item}</li>)}
      </ul>
      <div className="m-top__right">
        {!compact && <span className="m-circle"><Icon name="bell" /></span>}
        {!compact && <span className="m-circle"><Icon name="gear" /></span>}
        <span className="m-user"><span className="m-user__avatar">{initial}</span>{!compact && <b>{user}</b>}<Icon name="chevronDown" /></span>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <div className="m-stat">
      <div className="m-stat__head"><span className="m-stat__icon"><Icon name={icon} /></span><span className="m-stat__label">{label}</span></div>
      <b className="m-stat__value">{value}</b>
    </div>
  );
}

function ListRow({ icon, title, sub, status }: { icon: IconName; title: string; sub: string; status: Status }) {
  return (
    <div className="m-row">
      <span className="m-row__icon"><Icon name={icon} /></span>
      <span className="m-row__text"><b>{title}</b><small>{sub}</small></span>
      <Pill status={status} />
      <span className="m-row__go"><Icon name="chevronRight" /></span>
    </div>
  );
}

const recentOrders: [string, string, Status][] = [
  ['John Miller', 'Comprehensive Panel · Nov 3, 2026', 'progress'],
  ['Sarah Davis', 'Hormone Health Panel · Nov 2, 2026', 'shipped'],
  ['Michael Reed', 'Metabolic Panel · Nov 1, 2026', 'available'],
];

export function DashboardScreen() {
  return (
    <div className="dash">
      <TopBar items={appNav} active="Dashboard" />
      <div className="dash__body">
        <p className="dash__hello">Good Afternoon!</p>
        <div className="dash__stats">
          <StatCard icon="users" label="Active Patients" value="124" />
          <StatCard icon="clipboard" label="Open Orders" value="37" />
          <StatCard icon="clock" label="In Progress" value="29" />
          <StatCard icon="flask" label="Results Ready" value="86" />
        </div>
        <div className="m-card">
          <div className="m-card__head">
            <span className="m-card__title"><Icon name="clipboard" />Recent Test Orders</span>
            <span className="m-btn"><Icon name="clipboard" />View Orders</span>
          </div>
          <div className="m-list">
            {recentOrders.map(([name, sub, status]) => <ListRow key={name} icon="user" title={name} sub={sub} status={status} />)}
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
            {brand === 'frigo' ? <><Icon name="chevronLeft" /><MiniLogo /><Icon name="menu" /></> : <NexGenLogo />}
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
        <TopBar items={['Dashboard', 'Patients', 'Sessions', 'Lab Results']} active="Sessions" compact />
        <div className="orders__body">
          <div className="m-card">
            <div className="m-card__head">
              <span className="m-card__title"><Icon name="clipboard" />Test Orders</span>
              <span className="orders__search"><Icon name="search" />Search patients...</span>
            </div>
            <div className="m-table">
              <span className="m-th">Patient</span><span className="m-th">Test Panel</span><span className="m-th">Status</span><span className="m-th">Collection</span>
              {testOrders.map(([name, panel, status, date]) => (
                <div className="m-tr" key={name}>
                  <span className="m-tr__name"><span className="m-tr__dot" />{name}</span><span>{panel}</span><span><Pill status={status} /></span><span>{date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandedDevices() {
  return (
    <div className="branded" role="img" aria-label="Example clinic-branded portal for the fictional NexGen Wellness clinic, on desktop and mobile">
      <div className="browser">
        <TopBar items={['Dashboard', 'Patients', 'Results', 'Messages']} active="Patients" brand="nexgen" compact />
        <div className="browser__main">
          <p className="browser__hello">Welcome, Dr. Collins</p>
          <div className="browser__cards">
            <StatCard icon="users" label="Patients" value="86" />
            <StatCard icon="box" label="Kits Shipped" value="12" />
            <StatCard icon="file" label="Results" value="41" />
          </div>
        </div>
      </div>
      <PatientPhone brand="nexgen" />
    </div>
  );
}
