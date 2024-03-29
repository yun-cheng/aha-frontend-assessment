import { resultPageSizeAtom } from 'atoms/core'
import Divider from 'components/common/Divider'
import Input from 'components/common/Input'
import LargeButton from 'components/common/LargeButton'
import PageSizeSlider from 'components/search/PageSizeSlider'
import { useAtom } from 'jotai'
import type { ComponentProps, ReactElement } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'utils/cn'

export default function HomePage(): ReactElement {
	const navigate = useNavigate()

	const [pageSize] = useAtom(resultPageSizeAtom)

	const inputRef = useRef<HTMLInputElement>(null)

	const onClick: ComponentProps<typeof LargeButton>['onClick'] = () => {
		const keyword = inputRef.current?.value

		if (!keyword) return

		navigate(`/results?keyword=${keyword}&pageSize=${pageSize}`)
	}

	return (
		<div className='mx-auto h-screen max-w-[805px]'>
			<div
				className={cn(
					'h-full px-5 pt-[70px] sm:px-10 sm:pt-[54px]',
					'flex flex-col'
				)}
			>
				<div className='grow'>
					<h2 className='translate-y-px text-2xl/normal'>Search</h2>
					<Input
						ref={inputRef}
						className='mt-4 sm:mt-5'
						placeholder='Keyword'
					/>
					<Divider className='mt-[29px] hidden sm:block' />
					<h2 className='mt-[29px] text-2xl/normal sm:mt-[31px]'>
						# Of Results Per Page
					</h2>
					<div className='mt-4 flex h-[50px] sm:mt-5'>
						<div className='text-5xl font-bold'>{pageSize}</div>
						<div className='ml-2.5 mt-[21px] tracking-15'>results</div>
					</div>
					<div className='mt-[5px] sm:mt-3'>
						<PageSizeSlider />
					</div>
					<Divider className='mt-[28px] hidden sm:block' />
				</div>
				<div
					className={cn(
						'mt-7 pb-[90px] sm:pb-[87px]',
						'flex flex-col items-center sm:items-start'
					)}
				>
					<Divider className='block sm:hidden' />
					<LargeButton className='mt-20' onClick={onClick}>
						SEARCH
					</LargeButton>
				</div>
			</div>
		</div>
	)
}
