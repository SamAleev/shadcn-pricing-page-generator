import { cn } from '@/lib/utils';
import BackdropImage from '@/components/shared/BackdropImage';
import Image from 'next/image';
import { BlurBg } from '@/components/shared/blurBg';

/**
 * A component meant to be used in the landing page.
 * It displays a title, description and image of a product's feature.
 *
 * The image could either be left, right or center (larger).
 * The image can either be shown in perspective or flat.
 * The section can have a background or not.
 */
export const LandingProductFeature = ({
  className,
  title,
  titleComponent,
  description,
  descriptionComponent,
  textPosition = 'center',
  imageSrc,
  imageAlt = '',
  imagePosition = 'right',
  imagePerspective = 'paper',
  backgroundVariant = 'none',
  zoomOnHover = true,
  minHeight = 350,
  withBackground = false,
  withBackgroundSmudge = false,
  variant = 'primary',
  backgroundSmudgeVariant = 'primary',
}: {
  className?: string;
  title: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  textPosition?: 'center' | 'top';
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right' | 'center';
  imagePerspective?:
    | 'none'
    | 'left'
    | 'right'
    | 'bottom'
    | 'bottom-lg'
    | 'paper';
  backgroundVariant?: 'none' | 'primary' | 'secondary';
  zoomOnHover?: boolean;
  minHeight?: number;
  withBackground?: boolean;
  withBackgroundSmudge?: boolean;
  variant?: 'primary' | 'secondary';
  backgroundSmudgeVariant?: 'primary' | 'secondary';
}) => {
  return (
    <section
      className={cn(
        'w-full flex justify-center items-center gap-8 pb-24 flex-col',
        withBackground && variant === 'primary'
          ? 'bg-primary-100/20 dark:bg-primary-900/10'
          : '',
        withBackground && variant === 'secondary'
          ? 'bg-secondary-100/20 dark:bg-secondary-900/10'
          : '',
        className,
      )}
    >
      <section
        className={cn(
          'h-full flex flex-col relative mt-12 lg:mt-28',
          imagePosition === 'center'
            ? 'narrow-container'
            : 'wide-container grid lg:grid-cols-2',
          textPosition === 'center' ? 'items-center' : 'items-start',
        )}
        style={{
          minHeight,
        }}
      >
        <div
          className={cn(
            imagePosition === 'left' && 'lg:col-start-2 lg:row-start-1',
          )}
        >
          {title ? (
            <h2 className="text-4xl font-semibold leading-tight md:leading-tight max-w-xs sm:max-w-none md:text-5xl">
              {title}
            </h2>
          ) : (
            titleComponent
          )}

          {description ? (
            <p className="mt-6 md:text-xl">{description}</p>
          ) : (
            descriptionComponent
          )}
        </div>

        {imageSrc ? (
          <>
            {imagePosition === 'center' ? (
              <section className={cn('mt-auto wider-container pt-12 md:pt-16')}>
                <BackdropImage src={imageSrc} alt={imageAlt} />
              </section>
            ) : null}
            {withBackgroundSmudge ? (
              <div className="hidden lg:flex justify-center w-full h-full absolute">
                <BlurBg
                  className={cn(
                    'w-full lg:w-1/2 h-auto z-0 pointer-events-none',
                    imagePosition === 'center' ? 'top-5' : ' -top-1/3',
                    imagePerspective === 'paper' ? 'opacity-50' : 'opacity-100',
                  )}
                  variant={backgroundSmudgeVariant}
                />
              </div>
            ) : null}
            {imagePosition === 'left' || imagePosition === 'right' ? (
              <Image
                className={cn(
                  'xl:absolute xl:max-w-2xl 2xl:max-w-3xl rounded-md drop-shadow-xl',
                  zoomOnHover ? 'hover:scale-110 transition-all' : '',
                  imagePosition === 'left' ? 'left-0' : 'right-0',
                  imagePerspective === 'left' && 'lg:perspective-left',
                  imagePerspective === 'right' && 'lg:perspective-right',
                  imagePerspective === 'bottom' && 'lg:perspective-bottom',
                  imagePerspective === 'bottom-lg' &&
                    'lg:perspective-bottom-lg',
                  imagePerspective === 'paper' && 'lg:perspective-paper',
                  imagePerspective === 'none' ? 'mt-4' : 'mt-8',
                )}
                alt={imageAlt}
                src={imageSrc}
                width={minHeight + 125}
                height={minHeight + 125}
              />
            ) : null}{' '}
          </>
        ) : null}
      </section>
    </section>
  );
};
