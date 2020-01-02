import React from 'react';
import Link from 'next/link';
import { siteConfig } from '../../config';

export default function({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link href="/dashboard">
              <i className={siteConfig.siteIcon} />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link href="/dashboard">{siteConfig.siteName}</Link>
        </h3>
      )}
    </div>
  );
}
