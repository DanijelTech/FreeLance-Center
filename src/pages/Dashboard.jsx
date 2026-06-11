import { useEffect, useState } from "react";
import StatsCards from "../components/StatsCards";
import SocialNetworkCard from "../components/SocialNetworkCard";
import ProxyManager from "../components/ProxyManager";
import MessageInbox from "../components/MessageInbox";
import CommentsPanel from "../components/CommentsPanel";
import { socialNetworks } from "../data/mockData";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Simulacija nalaganja podatkov ob zagonu
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Pozdrav */}
      <div>
        <h1 className="text-2xl font-bold text-text sm:text-3xl">
          Pozdravljen nazaj, Danijel 👋
        </h1>
        <p className="mt-1 text-sm text-muted">
          Tukaj je pregled tvojih kanalov, sporočil in proxy nastavitev za danes.
        </p>
      </div>

      {/* Analytics overview */}
      <section>
        <StatsCards loading={loading} />
      </section>

      {/* Socialne mreže */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-text">Socialne mreže</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SocialNetworkCard key={i} loading />)
            : socialNetworks.map((network) => (
                <SocialNetworkCard key={network.id} network={network} />
              ))}
        </div>
      </section>

      {/* Proxy manager */}
      <section>
        <ProxyManager loading={loading} />
      </section>

      {/* Sporočila in komentarji */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <MessageInbox loading={loading} />
        <CommentsPanel loading={loading} />
      </section>
    </div>
  );
}
