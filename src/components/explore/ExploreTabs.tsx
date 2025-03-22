
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/use-language";

interface ExploreTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ExploreTabs = ({ activeTab, onTabChange }: ExploreTabsProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-8">
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="audiobooks">
            {t('audiobooks')}
          </TabsTrigger>
          <TabsTrigger value="new-releases">
            {t('newReleases')}
          </TabsTrigger>
          <TabsTrigger value="trending">
            {t('trending')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ExploreTabs;
