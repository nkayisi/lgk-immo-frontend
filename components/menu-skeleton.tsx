export function MenuSkeleton() {
    return (
        <div className="animate-pulse">
            {[1, 2].map((section) => (
                <div key={section} className="mb-6">
                    {/* Section Title Skeleton */}
                    <div className="px-3 mb-3">
                        <div className="h-3 w-20 bg-slate-200 rounded"></div>
                    </div>

                    {/* Menu Items Skeleton */}
                    <div className="space-y-3.5 px-5">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-slate-200 rounded"></div>
                                <div className="h-4 bg-slate-200 rounded flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Settings Section Skeleton */}
            <div className="my-6">
                <div className="px-3 mb-3">
                    <div className="h-3 w-24 bg-slate-200 rounded"></div>
                </div>
                <div className="space-y-3.5 px-5">
                    {[1, 2].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded flex-1"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
