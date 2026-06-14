# 1. Sơ đồ tổng quan 4 luồng nghiệp vụ bắt đầu

```mermaid
flowchart TD
    A([Người dùng mở hệ thống]) --> B{Đã xác thực danh tính?}

    B -- Chưa --> B1[Đăng nhập hoặc xác thực qua VNeID]
    B1 --> B2[Hệ thống xác thực người dùng]
    B2 --> C

    B -- Rồi --> C[Hiển thị màn hình chọn dịch vụ]

    C --> D1[Tôi nhặt được đồ]
    C --> D2[Tôi muốn tìm đồ]
    C --> D3[Tôi gặp người thất lạc]
    C --> D4[Tôi muốn tìm người thân]

    D1 --> E1[Luồng khai báo nhặt được tài sản hoặc giấy tờ]
    D2 --> E2[Luồng tìm kiếm và khai báo mất tài sản]
    D3 --> E3[Luồng khai báo gặp người thất lạc]
    D4 --> E4[Luồng tìm người thân thất lạc]

    E1 --> F[Chấp thuận xử lý dữ liệu cá nhân]
    E2 --> F
    E3 --> F
    E4 --> F

    F --> G{Người dùng đồng ý?}
    G -- Không --> H[Không gửi hồ sơ<br/>Hiển thị chính sách dữ liệu]
    G -- Có --> I[Nhập thông tin khai báo]

    I --> J[Hệ thống tạo mã hồ sơ]
    J --> K[Phân loại hồ sơ<br/>Tài sản, giấy tờ, người]
    K --> L[Ẩn, mã hóa, che dữ liệu nhạy cảm]
    L --> M[Điều phối cơ quan địa phương có thẩm quyền]
    M --> N[Cán bộ xác minh nghiệp vụ]
    N --> O{Đủ điều kiện xử lý tiếp?}

    O -- Không --> P[Yêu cầu bổ sung hoặc từ chối hồ sơ]
    O -- Có --> Q[Đối sánh dữ liệu và xử lý theo quy trình]

    Q --> R1[Thông báo cho người liên quan]
    Q --> R2[Đăng bảng tin công khai nếu được duyệt]
    Q --> R3[Lưu nội bộ nếu hồ sơ nhạy cảm]

    R1 --> S([Kết thúc hoặc tiếp tục xử lý])
    R2 --> S
    R3 --> S
```

---

# 2. Luồng người nhặt được tài sản / giấy tờ

```mermaid
flowchart TD
    A([Bắt đầu: Người dân nhặt được đồ]) --> B[Nhấn nút Tôi nhặt được đồ]
    B --> C{Đã xác thực danh tính?}

    C -- Chưa --> C1[Xác thực qua tài khoản hoặc VNeID]
    C1 --> D
    C -- Rồi --> D[Hiển thị thông tin nghĩa vụ khai báo và giao nộp]

    D --> E[Người dùng chấp thuận xử lý dữ liệu cá nhân]
    E --> F{Đồng ý?}

    F -- Không --> F1[Không tiếp nhận hồ sơ]
    F1 --> Z([Kết thúc])

    F -- Có --> G[Nhập thông tin tài sản nhặt được]

    G --> G1[Chọn nhóm đối tượng<br/>Tài sản, giấy tờ tùy thân, tiền, vật nuôi, khác]
    G1 --> G2{Có định danh được không?}

    G2 -- Có định danh --> H1[Nhập loại định danh<br/>Biển số, CCCD, hộ chiếu, thẻ ngân hàng, IMEI, serial]
    G2 -- Không định danh --> H2[Nhập mô tả nhận dạng<br/>Màu sắc, đặc điểm, số lượng, hoàn cảnh]
    G2 -- Giấy tờ nhạy cảm --> H3[Nhập thông tin giấy tờ<br/>Ảnh giấy tờ chỉ lưu nội bộ]

    H1 --> I[Nhập địa điểm, thời gian, hình ảnh, mô tả thêm]
    H2 --> I
    H3 --> I

    I --> J[Nhập thông tin liên hệ người nhặt được<br/>Chỉ cơ quan có thẩm quyền xem]
    J --> K[Gửi khai báo]

    K --> L[Hệ thống tạo mã hồ sơ]
    L --> M[Che, mã hóa, hash thông tin định danh]
    M --> N[Phân loại mức độ nhạy cảm]
    N --> O[Điều phối hồ sơ về công an xã hoặc UBND cấp xã theo địa bàn]

    O --> P[Hiển thị màn hình hướng dẫn]
    P --> P1[Mang tài sản đến cơ quan có thẩm quyền]
    P1 --> P2[Cung cấp mã hồ sơ]
    P2 --> P3[Mang giấy tờ tùy thân của người giao nộp nếu cần]

    O --> Q[Cán bộ nhận hồ sơ chờ xác minh]
    Q --> R[Cán bộ liên hệ người nhặt được]
    R --> S{Người dân giao nộp tài sản?}

    S -- Chưa --> S1[Cập nhật trạng thái<br/>Chờ giao nộp]
    S1 --> R

    S -- Có --> T[Ghi nhận tiếp nhận tài sản]
    T --> T1[Ghi ngày tiếp nhận]
    T1 --> T2[Ghi tình trạng, số lượng, hình ảnh, nơi lưu giữ]
    T2 --> U{Thông tin có hợp lệ?}

    U -- Không --> U1[Từ chối hoặc yêu cầu bổ sung]
    U1 --> Z

    U -- Có --> V[Chuyển sang bước kiểm duyệt công khai]
    V --> W{Có dữ liệu nhạy cảm?}

    W -- Có --> W1[Làm mờ ảnh và che thông tin định danh]
    W1 --> X{Được phép đăng bảng tin?}

    W -- Không --> X

    X -- Chỉ lưu nội bộ --> X1[Lưu riêng cho cơ quan xử lý]
    X -- Đăng rút gọn --> X2[Đăng bảng tin bản đã che dữ liệu]
    X -- Đăng công khai --> X3[Đăng bảng tin tài sản thất lạc]

    X1 --> Y[Ghi nhật ký xử lý]
    X2 --> Y
    X3 --> Y

    Y --> Z([Kết thúc luồng khai báo nhặt được])
```

---

# 3. Luồng người muốn tìm tài sản / giấy tờ bị mất

```mermaid
flowchart TD
    A([Bắt đầu: Người dân muốn tìm đồ]) --> B[Nhấn nút Tôi muốn tìm đồ]
    B --> C{Đã xác thực danh tính?}

    C -- Chưa --> C1[Xác thực qua tài khoản hoặc VNeID]
    C1 --> D
    C -- Rồi --> D[Chọn loại tài sản muốn tìm]

    D --> E[Nhập thông tin tìm kiếm]
    E --> E1[Loại tài sản hoặc giấy tờ]
    E --> E2[Thông tin định danh nếu có]
    E --> E3[Địa điểm nghi đánh rơi]
    E --> E4[Thời gian nghi đánh rơi]
    E --> E5[Màu sắc, nhãn hiệu, mô tả]

    E1 --> F[Hệ thống tìm trong bảng tin đã được duyệt]
    E2 --> F
    E3 --> F
    E4 --> F
    E5 --> F

    F --> G[Chấm điểm mức độ liên quan]
    G --> G1[Ưu tiên trùng định danh nội bộ]
    G --> G2[Ưu tiên cùng loại tài sản]
    G --> G3[Ưu tiên gần địa điểm và thời gian]
    G --> G4[Ưu tiên trùng mô tả, màu sắc, nhãn hiệu]

    G1 --> H[Hiển thị danh sách kết quả]
    G2 --> H
    G3 --> H
    G4 --> H

    H --> I[Chỉ hiển thị thông tin tài sản]
    I --> I1[Không hiển thị người nhặt được]
    I --> I2[Không hiển thị số điện thoại người nhặt]
    I --> I3[Không hiển thị định danh đầy đủ]
    I --> I4[Không hiển thị ảnh gốc chưa làm mờ]

    I --> J{Tìm thấy tài sản nghi phù hợp?}

    J -- Có --> K[Nhấn Tôi nghĩ đây là tài sản của tôi]
    K --> L[Điền form yêu cầu nhận lại]
    L --> L1[Thông tin người yêu cầu]
    L --> L2[Mô tả chi tiết tài sản]
    L --> L3[Thông tin định danh đầy đủ nếu có]
    L --> L4[Bằng chứng quyền sở hữu]
    L --> L5[Thời gian và địa điểm mất]
    L5 --> M[Gửi yêu cầu xác minh]
    M --> N[Hồ sơ chuyển cho cán bộ xử lý]
    N --> O([Sang luồng xác minh và trả kết quả])

    J -- Không --> P[Nhấn Không tìm thấy, tôi muốn khai báo mất đồ]
    P --> Q[Chấp thuận xử lý dữ liệu cá nhân]
    Q --> R{Đồng ý?}

    R -- Không --> R1[Không tạo hồ sơ]
    R1 --> Z([Kết thúc])

    R -- Có --> S[Điền form khai báo mất tài sản]
    S --> S1[Loại tài sản]
    S --> S2[Định danh nếu có]
    S --> S3[Tên tài sản, màu sắc, nhãn hiệu]
    S --> S4[Địa điểm và thời gian mất]
    S --> S5[Ảnh và chứng cứ liên quan]
    S --> S6[Thông tin liên hệ người mất]

    S6 --> T[Hệ thống tạo mã hồ sơ mất tài sản]
    T --> U[Ẩn, mã hóa, hash dữ liệu định danh]
    U --> V[Đối sánh tự động với hồ sơ nhặt được]
    V --> W[Thông báo nếu có kết quả phù hợp]
    W --> Z([Kết thúc luồng tìm tài sản])
```

---

# 4. Luồng đối sánh và thông báo tự động

```mermaid
flowchart TD
    A([Có hồ sơ mới hoặc hồ sơ được cập nhật]) --> B{Loại hồ sơ}

    B -- Khai báo nhặt được --> C1[Lấy dữ liệu tài sản nhặt được]
    B -- Khai báo mất --> C2[Lấy dữ liệu tài sản bị mất]

    C1 --> D[Chuẩn hóa dữ liệu]
    C2 --> D

    D --> D1[Chuẩn hóa loại tài sản]
    D --> D2[Chuẩn hóa địa điểm]
    D --> D3[Chuẩn hóa thời gian]
    D --> D4[Chuẩn hóa mô tả]
    D --> D5[Hash định danh nếu có]

    D1 --> E{Tài sản có định danh mạnh?}
    D2 --> E
    D3 --> E
    D4 --> E
    D5 --> E

    E -- Có --> F1[Đối sánh bằng hash định danh]
    E -- Không --> F2[Đối sánh bằng mô tả, loại, thời gian, địa điểm]

    F1 --> G[Chấm điểm tương đồng]
    F2 --> G

    G --> G1[Trùng định danh: điểm rất cao]
    G --> G2[Gần địa điểm: cộng điểm]
    G --> G3[Gần thời gian: cộng điểm]
    G --> G4[Trùng loại, màu, nhãn hiệu: cộng điểm]
    G --> G5[Hồ sơ đã được cơ quan xác minh: cộng điểm]

    G1 --> H{Điểm vượt ngưỡng?}
    G2 --> H
    G3 --> H
    G4 --> H
    G5 --> H

    H -- Không --> I[Lưu kết quả đối sánh thấp<br/>Không thông báo]
    I --> Z([Kết thúc])

    H -- Có --> J[Tạo bản ghi đối sánh]
    J --> K{Có cần cán bộ kiểm tra trước khi thông báo?}

    K -- Có --> L[Cán bộ xem kết quả đối sánh]
    L --> M{Cán bộ xác nhận có khả năng phù hợp?}
    M -- Không --> I
    M -- Có --> N[Cho phép thông báo]

    K -- Không --> N

    N --> O[Thông báo cho người liên quan]
    O --> O1[Thông báo trong hệ thống hoặc VNeID]
    O --> O2[SMS hoặc email nếu được phép]
    O --> O3[Không tiết lộ thông tin người nhặt được]
    O --> O4[Không tiết lộ định danh đầy đủ]

    O1 --> P[Người dùng xem kết quả liên quan đến hồ sơ của mình]
    O2 --> P
    O3 --> P
    O4 --> P

    P --> Q{Người dùng gửi yêu cầu nhận lại?}
    Q -- Không --> Z
    Q -- Có --> R[Chuyển sang luồng xác minh chủ sở hữu]
    R --> Z([Kết thúc luồng đối sánh])
```

---

# 5. Luồng xác minh nghiệp vụ của cán bộ địa phương

```mermaid
flowchart TD
    A([Cán bộ đăng nhập hệ thống]) --> B[Xác thực tài khoản cán bộ]
    B --> C[Kiểm tra phân quyền theo vai trò và địa bàn]
    C --> D[Hiển thị danh sách hồ sơ thuộc phạm vi xử lý]

    D --> E{Chọn loại hồ sơ}

    E -- Hồ sơ nhặt được --> F1[Xem hồ sơ nhặt được]
    E -- Hồ sơ mất tài sản --> F2[Xem hồ sơ mất tài sản]
    E -- Yêu cầu nhận lại --> F3[Xem yêu cầu nhận lại]
    E -- Hồ sơ người thất lạc --> F4[Xem hồ sơ người thất lạc]

    F1 --> G[Kiểm tra dữ liệu riêng tư]
    F2 --> G
    F3 --> G
    F4 --> G

    G --> H[Ghi nhật ký truy cập]
    H --> I[Liên hệ người khai báo hoặc người yêu cầu]
    I --> J{Thông tin có trung thực và đủ căn cứ?}

    J -- Không --> J1[Yêu cầu bổ sung thông tin]
    J1 --> J2{Bổ sung hợp lệ?}
    J2 -- Không --> J3[Từ chối hoặc tạm dừng hồ sơ]
    J3 --> Z([Kết thúc])
    J2 -- Có --> K

    J -- Có --> K[Tiếp tục xử lý nghiệp vụ]

    K --> L{Hồ sơ có tài sản cần giao nộp?}
    L -- Có --> L1[Hướng dẫn hoặc xác nhận giao nộp trực tiếp]
    L1 --> L2[Ghi nhận ngày tiếp nhận tài sản]
    L2 --> L3[Ghi nhận tình trạng, ảnh, nơi lưu giữ]
    L3 --> M

    L -- Không --> M[Đánh giá mức độ nhạy cảm dữ liệu]

    M --> N{Có dữ liệu nhạy cảm?}
    N -- Có --> N1[Làm mờ ảnh và che dữ liệu định danh]
    N1 --> N2[Lưu ảnh gốc nội bộ]
    N2 --> N3[Tạo ảnh công khai đã làm mờ]
    N3 --> O

    N -- Không --> O[Chọn chế độ hiển thị]

    O --> P{Chế độ hiển thị}
    P -- Chỉ lưu nội bộ --> P1[PRIVATE_AGENCY_ONLY]
    P -- Công khai rút gọn --> P2[PUBLIC_REDACTED]
    P -- Công khai đầy đủ phần được phép --> P3[PUBLIC]

    P1 --> Q[Cập nhật trạng thái hồ sơ]
    P2 --> Q
    P3 --> Q

    Q --> R[Ghi audit log]
    R --> S[Thông báo kết quả xử lý cho người liên quan]
    S --> Z([Kết thúc luồng xác minh])
```

---

# 6. Luồng trả kết quả và bàn giao tài sản

```mermaid
flowchart TD
    A([Người dân gửi yêu cầu nhận lại tài sản]) --> B[Hệ thống tạo hồ sơ yêu cầu nhận lại]
    B --> C[Cán bộ được phân công xử lý]
    C --> D[Ghi nhật ký truy cập hồ sơ]

    D --> E[Kiểm tra thông tin người yêu cầu]
    E --> E1[Xác thực danh tính]
    E --> E2[Kiểm tra số điện thoại hoặc tài khoản VNeID]
    E --> E3[Kiểm tra bằng chứng quyền sở hữu]
    E --> E4[So sánh mô tả, định danh, địa điểm, thời gian]

    E1 --> F{Thông tin chứng minh có phù hợp?}
    E2 --> F
    E3 --> F
    E4 --> F

    F -- Không phù hợp --> G[Từ chối yêu cầu]
    G --> G1[Ghi lý do từ chối]
    G1 --> G2[Thông báo cho người yêu cầu]
    G2 --> Z([Kết thúc])

    F -- Cần bổ sung --> H[Yêu cầu bổ sung chứng cứ]
    H --> H1{Bổ sung trong thời hạn?}
    H1 -- Không --> G
    H1 -- Có --> E

    F -- Phù hợp --> I{Có nhiều người cùng yêu cầu?}

    I -- Có --> I1[Đánh dấu tranh chấp]
    I1 --> I2[Cán bộ xác minh nâng cao]
    I2 --> I3{Xác định được chủ sở hữu hợp pháp?}
    I3 -- Không --> I4[Tạm dừng bàn giao<br/>Chờ xử lý của cơ quan có thẩm quyền]
    I4 --> Z
    I3 -- Có --> J

    I -- Không --> J[Phê duyệt yêu cầu nhận lại]

    J --> K[Lên lịch bàn giao]
    K --> L[Người nhận đến cơ quan có thẩm quyền]
    L --> M[Xác thực lại danh tính khi nhận]
    M --> N[Lập biên bản hoặc phiếu bàn giao]
    N --> O[Cập nhật trạng thái tài sản đã trả]
    O --> P[Thông báo cho người nhặt được nếu phù hợp]
    P --> Q[Đóng hồ sơ]
    Q --> R[Ghi audit log đầy đủ]
    R --> Z([Kết thúc luồng trả kết quả])
```

---

# 7. Luồng quản lý thời hạn và xác lập quyền sở hữu

Luồng này dùng cho phần pháp lý về: ghi nhận ngày tiếp nhận, ngày bắt đầu thông báo công khai, tự động tính thời hạn, cảnh báo sắp hết hạn và tạo hồ sơ điện tử để cơ quan có thẩm quyền xem xét xác lập quyền sở hữu. 

```mermaid
flowchart TD
    A([Tài sản đã được cơ quan tiếp nhận]) --> B[Ghi ngày tiếp nhận tài sản]
    B --> C{Có đủ điều kiện thông báo công khai?}

    C -- Không --> C1[Lưu nội bộ<br/>Chờ xác minh hoặc xử lý đặc biệt]
    C1 --> Z([Kết thúc tạm thời])

    C -- Có --> D[Phê duyệt nội dung thông báo công khai]
    D --> E[Ghi ngày bắt đầu thông báo công khai]
    E --> F[Hệ thống xác định loại tài sản]

    F --> G{Loại tài sản}

    G -- Tài sản đánh rơi hoặc bỏ quên --> H1[Thời hạn theo dõi: 01 năm từ ngày thông báo công khai]
    G -- Tài sản vô chủ hoặc không xác định chủ --> H2[Thời hạn theo dõi: 01 năm đối với động sản]
    G -- Tài sản bị chôn, giấu, vùi lấp, chìm đắm --> H3[Theo dõi xử lý riêng<br/>Kiểm tra yếu tố di tích, lịch sử, văn hóa]
    G -- Gia cầm thất lạc --> H4[Thời hạn theo dõi: 01 tháng]
    G -- Gia súc thất lạc --> H5[Thời hạn theo dõi: 06 tháng<br/>Hoặc 01 năm nếu thả rông theo tập quán]
    G -- Vật nuôi dưới nước --> H6[Thời hạn theo dõi: 01 tháng nếu có dấu hiệu riêng biệt]
    G -- Giấy tờ tùy thân --> H7[Không xử lý như xác lập quyền sở hữu tài sản<br/>Chuyển quy trình trao trả hoặc xử lý giấy tờ]

    H1 --> I[Thiết lập lịch cảnh báo]
    H2 --> I
    H3 --> I
    H4 --> I
    H5 --> I
    H6 --> I
    H7 --> I

    I --> J[Hệ thống kiểm tra định kỳ]
    J --> K{Có người yêu cầu nhận lại trước hạn?}

    K -- Có --> L[Chuyển sang luồng xác minh chủ sở hữu]
    L --> M{Xác minh thành công?}
    M -- Có --> N[Bàn giao tài sản và đóng hồ sơ]
    M -- Không --> J

    K -- Không --> O{Sắp hết thời hạn?}
    O -- Chưa --> J
    O -- Có --> P[Gửi cảnh báo cho cán bộ phụ trách]

    P --> Q{Đã hết thời hạn mà không có chủ sở hữu?}
    Q -- Chưa --> J

    Q -- Có --> R[Tạo hồ sơ điện tử phục vụ xem xét xác lập quyền sở hữu]
    R --> S[Cán bộ kiểm tra loại tài sản, giá trị, chi phí bảo quản]
    S --> T{Tài sản thuộc di tích lịch sử, văn hóa hoặc bảo vật?}

    T -- Có --> T1[Đề xuất xử lý thuộc Nhà nước<br/>Ghi nhận khoản thưởng nếu có]
    T1 --> Y[Trình cơ quan có thẩm quyền quyết định]

    T -- Không --> U{Giá trị tài sản vượt ngưỡng pháp luật?}
    U -- Không vượt --> U1[Đề xuất xác lập quyền sở hữu cho người nhặt được nếu đủ điều kiện]
    U -- Vượt --> U2[Đề xuất phân chia giá trị theo quy định<br/>Người nhặt được, chi phí bảo quản, phần thuộc Nhà nước]

    U1 --> Y
    U2 --> Y

    Y --> V[Cơ quan có thẩm quyền ra quyết định xử lý]
    V --> W[Cập nhật kết quả pháp lý vào hồ sơ]
    W --> X[Đóng hồ sơ]
    X --> Z([Kết thúc luồng thời hạn])
```

---

# 8. Luồng bảo vệ dữ liệu cá nhân và phân quyền truy cập

Luồng này nên được vẽ riêng vì nó là yêu cầu xuyên suốt. Đánh giá pháp lý nêu rõ người dân chỉ được tra cứu hồ sơ do mình tạo hoặc kết quả đối sánh liên quan tới hồ sơ của mình; công an/UBND cấp xã truy cập theo phạm vi địa bàn và phân quyền; đơn vị vận hành không được khai thác dữ liệu dân cư ngoài phạm vi vận hành kỹ thuật. 

```mermaid
flowchart TD
    A([Có yêu cầu truy cập dữ liệu]) --> B[Xác thực người truy cập]
    B --> C{Vai trò người truy cập}

    C -- Người dân --> D1[Citizen]
    C -- Cán bộ địa phương --> D2[Officer hoặc Agency Admin]
    C -- Đơn vị vận hành --> D3[System Operator]
    C -- Quản trị hệ thống --> D4[System Admin]

    D1 --> E1{Dữ liệu cần xem có thuộc hồ sơ của chính mình<br/>hoặc kết quả đối sánh liên quan không?}
    E1 -- Không --> F1[Từ chối truy cập]
    E1 -- Có --> G1[Cho xem dữ liệu được phép<br/>Không hiển thị dữ liệu người khác]

    D2 --> E2{Hồ sơ có thuộc địa bàn và chức năng được phân quyền không?}
    E2 -- Không --> F2[Từ chối truy cập]
    E2 -- Có --> G2[Cho xem dữ liệu nghiệp vụ cần thiết]

    D3 --> E3{Yêu cầu có phục vụ vận hành kỹ thuật không?}
    E3 -- Không --> F3[Từ chối khai thác dữ liệu]
    E3 -- Có --> G3[Cho truy cập giới hạn<br/>Ưu tiên dữ liệu ẩn danh hoặc log kỹ thuật]

    D4 --> E4{Có lý do quản trị hợp lệ không?}
    E4 -- Không --> F4[Từ chối hoặc yêu cầu phê duyệt]
    E4 -- Có --> G4[Cho truy cập theo chính sách quản trị]

    G1 --> H[Áp dụng che dữ liệu định danh]
    G2 --> H
    G3 --> H
    G4 --> H

    H --> I[Mã hóa dữ liệu nhạy cảm khi lưu trữ]
    I --> J[Ghi nhật ký truy cập]
    J --> K[Kiểm tra chính sách lưu trữ hoặc xóa dữ liệu theo thời hạn]
    K --> L([Hoàn tất truy cập an toàn])

    F1 --> J
    F2 --> J
    F3 --> J
    F4 --> J
```

---

# 9. Luồng mở rộng: người dân gặp người thất lạc

Luồng này nên đặt ở giai đoạn sau vì đánh giá pháp lý xác định đây là chức năng nhạy cảm cao, liên quan dữ liệu cá nhân, đặc biệt là trẻ em, người cao tuổi, người mất khả năng nhận thức hoặc người cần hỗ trợ đặc biệt.  

```mermaid
flowchart TD
    A([Bắt đầu: Người dân gặp người thất lạc]) --> B[Nhấn nút Tôi gặp người thất lạc]
    B --> C[Hiển thị cảnh báo an toàn]

    C --> D{Có tình huống khẩn cấp?}
    D -- Có --> D1[Khuyến nghị liên hệ ngay công an, y tế hoặc cơ quan có thẩm quyền]
    D1 --> D2[Form chỉ ghi nhận thông tin ban đầu nếu cần]
    D2 --> E

    D -- Không --> E{Đã xác thực danh tính người khai báo?}

    E -- Chưa --> E1[Xác thực tài khoản hoặc VNeID]
    E1 --> F
    E -- Rồi --> F[Chấp thuận xử lý dữ liệu cá nhân]

    F --> G{Đồng ý?}
    G -- Không --> G1[Không gửi hồ sơ]
    G1 --> Z([Kết thúc])

    G -- Có --> H[Nhập thông tin người được phát hiện]
    H --> H1[Họ tên nếu biết]
    H --> H2[Giới tính, tuổi ước đoán]
    H --> H3[Đặc điểm nhận dạng]
    H --> H4[Tình trạng sức khỏe, tinh thần]
    H --> H5[Địa điểm và thời gian gặp]
    H --> H6[Giấy tờ định danh nếu có]
    H --> H7[Ảnh liên quan nếu thật sự cần thiết]

    H1 --> I[Hệ thống mặc định lưu nội bộ]
    H2 --> I
    H3 --> I
    H4 --> I
    H5 --> I
    H6 --> I
    H7 --> I

    I --> J[Phân loại mức độ nhạy cảm]
    J --> K{Là trẻ em, người cao tuổi, người yếu thế hoặc dữ liệu ảnh nhạy cảm?}

    K -- Có --> K1[Đặt mức bảo vệ cao]
    K1 --> K2[Không tự động công khai]
    K2 --> L

    K -- Không --> L[Điều phối hồ sơ đến cơ quan địa phương]

    L --> M[Cán bộ xác minh tình huống]
    M --> N{Cần chuyển cơ quan hoặc hỗ trợ khẩn?}

    N -- Có --> N1[Chuyển cơ quan công an, y tế hoặc bảo trợ phù hợp]
    N1 --> O

    N -- Không --> O[Kiểm tra khả năng đối sánh với hồ sơ tìm người thân]

    O --> P{Có kết quả phù hợp?}
    P -- Không --> Q[Lưu hồ sơ nội bộ để tiếp tục theo dõi]
    P -- Có --> R[Cán bộ xác minh với bên tìm người thân]

    R --> S{Xác minh thành công?}
    S -- Không --> Q
    S -- Có --> T[Hỗ trợ đoàn tụ hoặc chuyển cơ quan có thẩm quyền xử lý]

    Q --> U{Có được phép công khai thông tin tìm thân nhân?}
    U -- Không --> V[Tiếp tục lưu nội bộ]
    U -- Có --> W[Làm mờ dữ liệu nhạy cảm và đăng bản được duyệt]

    V --> X[Ghi audit log]
    W --> X
    T --> X
    X --> Z([Kết thúc luồng gặp người thất lạc])
```

---

# 10. Luồng mở rộng: người dân tìm người thân thất lạc

```mermaid
flowchart TD
    A([Bắt đầu: Người dân muốn tìm người thân]) --> B[Nhấn nút Tôi muốn tìm người thân]
    B --> C[Hiển thị lưu ý pháp lý và bảo vệ dữ liệu cá nhân]

    C --> D{Có dấu hiệu khẩn cấp hoặc nguy hiểm?}
    D -- Có --> D1[Khuyến nghị trình báo ngay cơ quan công an hoặc cơ quan có thẩm quyền]
    D1 --> D2[Tiếp tục ghi nhận hồ sơ hỗ trợ nếu phù hợp]
    D2 --> E

    D -- Không --> E{Đã xác thực danh tính?}

    E -- Chưa --> E1[Xác thực tài khoản hoặc VNeID]
    E1 --> F
    E -- Rồi --> F[Chấp thuận xử lý dữ liệu cá nhân]

    F --> G{Đồng ý?}
    G -- Không --> G1[Không tạo hồ sơ]
    G1 --> Z([Kết thúc])

    G -- Có --> H[Nhập thông tin người cần tìm]
    H --> H1[Họ tên, tên gọi khác]
    H --> H2[Ngày sinh hoặc tuổi ước tính]
    H --> H3[Giới tính]
    H --> H4[Ảnh gần nhất]
    H --> H5[Đặc điểm nhận dạng]
    H --> H6[Tình trạng sức khỏe hoặc bệnh lý]
    H --> H7[Trang phục lúc mất liên lạc]
    H --> H8[Địa điểm và thời gian cuối cùng nhìn thấy]

    H1 --> I[Nhập thông tin người khai báo]
    H2 --> I
    H3 --> I
    H4 --> I
    H5 --> I
    H6 --> I
    H7 --> I
    H8 --> I

    I --> I1[Quan hệ với người cần tìm]
    I --> I2[Số điện thoại liên hệ]
    I --> I3[Giấy tờ hoặc căn cứ chứng minh quan hệ nếu cần]
    I --> I4[Đã trình báo cơ quan nào chưa]

    I1 --> J[Hệ thống tạo hồ sơ tìm người thân]
    I2 --> J
    I3 --> J
    I4 --> J

    J --> K[Phân loại mức độ nhạy cảm]
    K --> L{Người cần tìm là trẻ em hoặc người yếu thế?}

    L -- Có --> L1[Áp dụng kiểm soát dữ liệu nghiêm ngặt]
    L1 --> L2[Không tự động công khai ảnh và thông tin đời tư]
    L2 --> M

    L -- Không --> M[Đối sánh với hồ sơ người được phát hiện]

    M --> N{Có kết quả nghi phù hợp?}

    N -- Có --> O[Chuyển kết quả cho cán bộ xác minh]
    O --> P[Cán bộ liên hệ các bên liên quan]
    P --> Q{Xác minh đúng người thân?}

    Q -- Có --> R[Hỗ trợ đoàn tụ hoặc hướng dẫn làm việc với cơ quan có thẩm quyền]
    Q -- Không --> S[Lưu kết quả sai lệch và tiếp tục tìm kiếm]

    N -- Không --> T[Lưu hồ sơ tìm người thân]
    T --> U{Có đủ điều kiện công khai thông tin tìm kiếm?}

    U -- Không --> V[Chỉ lưu nội bộ và chờ đối sánh]
    U -- Có --> W[Cán bộ duyệt nội dung công khai đã che dữ liệu nhạy cảm]

    R --> X[Ghi audit log và cập nhật trạng thái]
    S --> X
    V --> X
    W --> X

    X --> Z([Kết thúc luồng tìm người thân])
```

---

# 11. State diagram trạng thái hồ sơ tài sản

Khối này rất hữu ích vì nó mô tả vòng đời hồ sơ.

```mermaid
stateDiagram-v2
    [*] --> SUBMITTED_ONLINE: Người dân gửi khai báo

    SUBMITTED_ONLINE --> NEED_CONSENT_REVIEW: Kiểm tra chấp thuận dữ liệu
    NEED_CONSENT_REVIEW --> REJECTED: Không có chấp thuận hợp lệ
    NEED_CONSENT_REVIEW --> AGENCY_ASSIGNED: Chấp thuận hợp lệ

    AGENCY_ASSIGNED --> CONTACTING_REPORTER: Phân công cán bộ
    CONTACTING_REPORTER --> WAITING_FOR_HANDOVER: Cần giao nộp tài sản
    CONTACTING_REPORTER --> NEED_MORE_INFO: Thiếu thông tin
    NEED_MORE_INFO --> CONTACTING_REPORTER: Người dân bổ sung
    NEED_MORE_INFO --> REJECTED: Không bổ sung hoặc không hợp lệ

    WAITING_FOR_HANDOVER --> RECEIVED_BY_AGENCY: Cơ quan tiếp nhận tài sản
    WAITING_FOR_HANDOVER --> CLOSED: Quá hạn hoặc hủy hồ sơ

    RECEIVED_BY_AGENCY --> NEEDS_REDACTION: Có dữ liệu nhạy cảm
    RECEIVED_BY_AGENCY --> READY_FOR_APPROVAL: Không cần làm mờ

    NEEDS_REDACTION --> READY_FOR_APPROVAL: Đã làm mờ ảnh và che định danh

    READY_FOR_APPROVAL --> PRIVATE_AGENCY_ONLY: Chỉ lưu nội bộ
    READY_FOR_APPROVAL --> PUBLISHED_REDACTED: Đăng bản rút gọn
    READY_FOR_APPROVAL --> PUBLISHED: Đăng công khai phần được phép

    PRIVATE_AGENCY_ONLY --> MATCHING: Đối sánh nội bộ
    PUBLISHED_REDACTED --> MATCHING: Đối sánh và nhận yêu cầu
    PUBLISHED --> MATCHING: Đối sánh và nhận yêu cầu

    MATCHING --> CLAIM_PENDING: Có yêu cầu nhận lại
    MATCHING --> PUBLIC_NOTICE_RUNNING: Chưa có yêu cầu

    CLAIM_PENDING --> CLAIM_NEED_MORE_INFO: Cần bổ sung chứng cứ
    CLAIM_NEED_MORE_INFO --> CLAIM_PENDING: Đã bổ sung
    CLAIM_PENDING --> CLAIM_REJECTED: Không chứng minh được
    CLAIM_PENDING --> CLAIM_VERIFIED: Xác minh thành công

    CLAIM_REJECTED --> PUBLIC_NOTICE_RUNNING
    CLAIM_VERIFIED --> RETURN_SCHEDULED: Lên lịch bàn giao
    RETURN_SCHEDULED --> RETURNED_TO_OWNER: Đã bàn giao

    PUBLIC_NOTICE_RUNNING --> EXPIRING_SOON: Sắp hết thời hạn
    EXPIRING_SOON --> EXPIRED_WAITING_LEGAL_REVIEW: Hết thời hạn chưa có chủ
    EXPIRED_WAITING_LEGAL_REVIEW --> OWNERSHIP_REVIEWED: Cơ quan xem xét xác lập quyền sở hữu

    RETURNED_TO_OWNER --> CLOSED
    OWNERSHIP_REVIEWED --> CLOSED
    REJECTED --> CLOSED
    CLOSED --> [*]
```

---

# 12. Sơ đồ ERD nghiệp vụ mức cao

Khối này không phải luồng xử lý, nhưng nên có trong draw.io để nhóm dev hiểu dữ liệu chính.

```mermaid
erDiagram
    USERS {
        uuid id
        string fullName
        string phone
        string email
        string role
        uuid agencyId
        boolean isVerified
        datetime createdAt
    }

    AGENCIES {
        uuid id
        string name
        string type
        string provinceCode
        string wardCode
        string address
        string phone
    }

    REPORTS {
        uuid id
        string publicCode
        string subjectKind
        string reportDirection
        string status
        string visibility
        string title
        string description
        uuid agencyId
        datetime eventTime
        string locationText
        string provinceCode
        string wardCode
        decimal latitude
        decimal longitude
        string reporterName
        string reporterPhone
        string riskLevel
        string sensitiveLevel
        datetime receivedAt
        datetime publicNoticeStartedAt
        datetime publishedAt
        datetime closedAt
    }

    ASSET_DETAILS {
        uuid id
        uuid reportId
        string assetName
        string assetType
        string identityLevel
        string identifierType
        string identifierEncrypted
        string identifierHash
        string identifierMasked
        string brand
        string model
        string color
        int quantity
        decimal estimatedValue
        boolean isMoney
    }

    PERSON_DETAILS {
        uuid id
        uuid reportId
        string knownName
        string identityLevel
        string identifierType
        string identifierEncrypted
        string identifierHash
        string identifierMasked
        string gender
        string ageText
        string appearanceDescription
        string healthCondition
        boolean isMinor
        boolean needsMedicalHelp
        boolean hasCrimeRisk
    }

    MEDIA_FILES {
        uuid id
        uuid reportId
        string originalUrl
        string redactedUrl
        string mediaType
        string visibility
        string redactionStatus
        uuid uploadedByUserId
    }

    CLAIMS {
        uuid id
        uuid reportId
        string claimantName
        string claimantPhone
        string claimDescription
        string proofText
        string status
        uuid reviewedByUserId
        datetime reviewedAt
    }

    CUSTODY_RECORDS {
        uuid id
        uuid reportId
        uuid agencyId
        uuid receivedByUserId
        datetime receivedAt
        string handoverFromName
        string handoverFromPhone
        string itemCondition
        string storageLocationPrivate
        string receiptNumber
    }

    MATCH_RESULTS {
        uuid id
        uuid sourceReportId
        uuid targetReportId
        decimal score
        string matchType
        string status
        datetime createdAt
    }

    AUDIT_LOGS {
        uuid id
        uuid actorUserId
        string action
        string entityType
        uuid entityId
        json beforeJson
        json afterJson
        string ipAddress
        datetime createdAt
    }

    USERS ||--o{ REPORTS : creates
    AGENCIES ||--o{ USERS : manages
    AGENCIES ||--o{ REPORTS : handles
    REPORTS ||--o| ASSET_DETAILS : has
    REPORTS ||--o| PERSON_DETAILS : has
    REPORTS ||--o{ MEDIA_FILES : has
    REPORTS ||--o{ CLAIMS : receives
    REPORTS ||--o{ CUSTODY_RECORDS : stores
    REPORTS ||--o{ MATCH_RESULTS : source
    REPORTS ||--o{ MATCH_RESULTS : target
    USERS ||--o{ AUDIT_LOGS : performs
```

---

Có thể dùng các sơ đồ theo thứ tự sau: **Tổng quan → Nhặt được đồ → Tìm đồ → Đối sánh → Cán bộ xác minh → Trả kết quả → Quản lý thời hạn → Bảo vệ dữ liệu → Người thất lạc → State diagram → ERD**.
