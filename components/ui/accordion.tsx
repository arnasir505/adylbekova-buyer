'use client';

import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import {
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from '@radix-ui/react-accordion';

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
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
