"use client";

import React, { useState, useEffect } from 'react';


export default function Page() {
    return (
        <div className="listing-list">
            <div className="flex justify-center my-8">
                <a href="/staff/reported-listings" className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                    Reported Listings
                </a>
            </div>

            <div className="flex justify-center my-8">
                <a href="/staff/top-ups" className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                    Top Up Transactions
                </a>
            </div>
        </div>
    );
}