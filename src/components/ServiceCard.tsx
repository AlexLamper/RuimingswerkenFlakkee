import type { Service } from "@/data/services";

type Props = {
  service: Service;
  variant?: "compact" | "detailed";
};

export function ServiceCard({ service, variant = "compact" }: Props) {
  const Icon = service.icon;
  const body = variant === "detailed" ? service.long : service.short;

  return (
    <article className="group flex h-full flex-col border border-steel-200 bg-white p-7 transition-colors hover:border-navy-700">
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy-50 text-navy-900 transition-colors group-hover:bg-navy-900 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-navy-900">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-600">
        {body}
      </p>
    </article>
  );
}
