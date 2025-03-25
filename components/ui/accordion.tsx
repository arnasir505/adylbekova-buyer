'use client';

import { ComponentProps } from 'react';
import {
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';

function Accordion({ ...props }: ComponentProps<typeof Root>) {
  return <Root data-slot='accordion' {...props} />;
}

function AccordionItem({ className, ...props }: ComponentProps<typeof Item>) {
  return <Item data-slot='accordion-item' className={className} {...props} />;
}

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof Trigger>) {
  return (
    <Header className='flex'>
      <Trigger data-slot='accordion-trigger' className={className} {...props}>
        {children}
      </Trigger>
    </Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Content
      data-slot='accordion-content'
      className={cn(
        'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
