// Desktop (>=768px): three columns (400 / 639 / 401 at 1440). Side columns are sticky to
// the viewport with content pinned top and bottom; only the center column's content scrolls.
// Mobile: one column — left, center, right stacked, then `mobileEnd` (e.g. the credit).
function SideColumn({ top, bottom, className = '' }) {
  return (
    <aside
      className={`flex flex-col px-[18px] md:sticky md:top-0 md:h-screen md:justify-between md:self-start md:px-[22px] md:pt-[130px] md:pb-[21px] ${className}`}
    >
      {top && <div>{top}</div>}
      {bottom && <div>{bottom}</div>}
    </aside>
  )
}

export default function Layout({ left = {}, right = {}, mobileEnd, children }) {
  return (
    <div className="relative z-10 min-h-screen md:grid md:grid-cols-site">
      <SideColumn top={left.top} bottom={left.bottom} className="gap-[93px] pt-[159px]" />
      <main className="border-line pt-[82px] md:min-h-screen md:border-x md:pt-[130px] md:pb-[21px]">
        {children}
      </main>
      <SideColumn top={right.top} bottom={right.bottom} className="gap-[107px] pt-[92px]" />
      {mobileEnd && <div className="px-[18px] pt-[68px] pb-[25px] md:hidden">{mobileEnd}</div>}
    </div>
  )
}
